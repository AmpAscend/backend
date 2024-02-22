const express = require('express');
const fs = require('fs');
const nearestStationRouter = express.Router();

let data;

// Read the data from data.json file
fs.readFile('./data.json', 'utf8', (err, jsonString) => {
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
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
nearestStationRouter.get('/api/nearestStation', (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    const userLocation = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
    };

    // Calculate distances for all locations
    for (const location of data) {
        location.distance = calculateDistance(userLocation.latitude, userLocation.longitude, parseFloat(location.lattitude), parseFloat(location.longitude));
    }

    // Sort locations based on distance
    data.sort((a, b) => a.distance - b.distance);

    // Return the nearest location
    res.json(data.slice(0, 1));
});


module.exports = nearestStationRouter;


 