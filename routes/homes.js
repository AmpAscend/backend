const express = require("express");
const User = require("../models/user");
const homeRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

homeRouter.post("/api/addHome", auth,  async (req, res) => {
    try {
  
      const user = await User.findById(req.user);
      if (!user) {
        return res
          .status(400)
          .json({ msg: "User does not exist!" });
      }
  
      const {name, provider, panels } = req.body;

      user.homes.push({ name, provider, panels});
  
      await user.save();
  
      res.status(200).json({ message: 'Home added successfully' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  module.exports = homeRouter;