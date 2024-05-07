
const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

 //create a post
router.post("/",async (req,res)=>{
  const newPost = new Post(req.body);
  try{
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  }catch(err){
    res.status(500).json(err);
  }
});



 //update a post
 router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


 //delete a post
 router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


 //like a post or dislike if you already liked
 router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


 //get a post
 router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});





  //add comment
  router.post("/:postId/comments", async (req, res) => {
    try {
      const { userId, commentText } = req.body;
      const postId = req.params.postId;
  
      // Find the post by postId
      const post = await Post.findById(postId);
  
      // If post not found, return an error
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Add the comment to the post
      post.comments.push({ userId, commentText });
      
      // Save the updated post
      await post.save();
  
      res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  



module.exports=router