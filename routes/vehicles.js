const express = require("express");
const User = require("../models/user");
const vehicleRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

vehicleRouter.post("/api/addVehicle", auth,  async (req, res) => {
    try {
  
      const user = await User.findById(req.user);
      if (!user) {
        return res
          .status(400)
          .json({ msg: "User does not exist!" });
      }
  
      const { name, make, model, connector, reg_no } = req.body;

      user.vehicles.push({ name, make, model, connector, reg_no });
  
      await user.save();
  
      res.status(200).json({ message: 'Vehicle added successfully' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  module.exports = vehicleRouter;