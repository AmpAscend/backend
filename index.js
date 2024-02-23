const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs');
require('dotenv').config();
let data;

const authRouter = require("./routes/auth");
const vehicleRouter = require("./routes/vehicles");
const homeRouter = require("./routes/homes");
const nearestStationRouter = require("./routes/nearest_station");
const PORT = process.env.PORT;
const app = express();
const DB = process.env.DB_URL;


app.use(express.json());
app.use(authRouter);
app.use(vehicleRouter);
app.use(homeRouter);
app.use(nearestStationRouter);


mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

// Read the data from data.json file
fs.readFile('data.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log('Error reading file:', err);
    return;
  }
  try {
    data = JSON.parse(jsonString);
  } catch (err) {
    console.log('Error parsing JSON string:', err);
  }
});

app.get('/api', (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  const userLocation = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
  };
  
  function calculate_distance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; 
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
}

  for (const location of data) {
      location.distance = calculate_distance(userLocation.latitude, userLocation.longitude, parseFloat(location.lattitude), parseFloat(location.longitude));
  }

  data.sort((a, b) => a.distance - b.distance);
  res.json(data.slice(0, 1));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});

