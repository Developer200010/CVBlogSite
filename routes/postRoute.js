const router = require("express").Router();
const userModel = require("../models/User.js");
const postModel = require("../models/Post.js")

// creating post

router.post("/", async (req,res)=>{
    const newPost = new postModel(req.body);
    try {
        const savePost =await newPost.save();
        res.status(200).json(savePost)
    } catch (error) {
        res.status(500).json(error)
    }
});


router.put("/:id",async (req,res)=>{
    try {
        const post = await postModel.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatedPost = await postModel.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                }, {new:true})
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json("you can update only your post!")
            }
        }else{
            res.status(500).json("you can update only your post!")
        }
    } catch (error) {
        res.status(500).json(error)
    }  
})

router.delete("/:id",async (req,res)=>{
    try {
        const post = await postModel.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                await post.deleteOne();
                res.status(200).json("post has been deleted!")
            } catch (error) {
                res.status(500).json(error)
            } 
        }else{
            res.status(500).json("you can delete only your post!")
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get("/:id",async (req,res)=>{
    try {
        const post = await postModel.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/",async (req,res)=>{
        const username = req.query.user;
        const catName = req.query.category;
    try {
        let post;
        if(username){
            post = await postModel.find({username});
        } else if(catName){
            post = await postModel.find({categories:{
                $in: [catName]
            }});
        }else{
            post = await postModel.find();
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;