const router = require("express").Router();
const userModel = require("../models/User.js");
const bcrypt = require("bcrypt");
// register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json("Email is incorrect");
      }
      
      const validatedUser = await bcrypt.compare(req.body.password, user.password);
      if (!validatedUser) {
        return res.status(400).json("Password is incorrect");
      }
      
      const {password,...others} = user._doc;
  
      return res.status(200).json(others);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  

module.exports = router;
