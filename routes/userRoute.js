const router = require("express").Router();
const userModel = require("../models/User.js");
const userPost = require("../models/Post.js")
const bcrypt = require("bcrypt");

// update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(401).json("you can update only your account!");
    }
  } else {
    res.status(401).json("you can update only your account!");
  }
});

// deleting user and user post
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
        const user = await userModel.findById(req.params.id)
      try {
        await userPost.deleteMany({username:user.username})
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {}
  } else {
    res.status(401).json("you can update only your account");
  }
});

// getting one user data
router.get("/:id", async (req,res)=>{
    console.log(req.params.id)
    try {
        const user = await userModel.findById(req.params.id);
        // if(!user){
        //     return res.status(401).json("user does not have an account!")
        // }
        const {password, ...others} = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json("user does not have an account", error)
    }
})

module.exports = router;
