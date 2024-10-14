const router = require("express").Router();
const catModel = require("../models/Category.js")

router.post("/",async (req,res)=>{
    const newCat = new catModel(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat)
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get("/", async (req,res)=>{
    try {
        const categories = await catModel.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router; 