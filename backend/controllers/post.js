require('dotenv').config()
const Post = require('../models/Post')
const User = require('../models/User')

const createPost = async (req, res) => {
   try {
      console.log("enter in create post",)
      const newPostData = {
         caption: req.body.caption,
         image: {
            public_id: "req.body.public_id",
            url: "req.body.url"
         },
         owner: req.id,
      }
      const post = await Post.create(newPostData)
      console.log('post created')

      const user = await User.findById(req.id)
      console.log("object user", user)
      user.posts.push(post._id)

      await user.save()
      res.status(201).json({
         message: "Post created successfully",
         post,
      })
   } catch (error) {
      res.status(500).json({ message: error.message })
   }
}

const likeAndUnlikePost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);

      if(!post){
         return res.status(404).json({
            message: "Post Not FOund!"
         })
      }
      if(post.likes.some(like => like.equals(req.id))) {
         const index = post.likes.indexOf(req.id)
         post.likes.splice(index, 1)

         await post.save();

         return res.status(201).json({
            message: "Post Unliked"
         })
      }else {
         post.likes.push(req.id)
         await post.save();

         return res.status(201).json({
            message: "Post Liked"
         })
      }

   } catch (error) {
      res.status(500).json({
         message: error.message
      })
   }
}

const deletePost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      console.log("post", post)

      if(!post){
         return res.status(404).json({
            message: "Post Not Found!"
         })
      }

      if(post.owner.toString() !== req.id.toString()){
         return res.status(401).json({
            message: "User Unauthorized"
         })
      }
      await post.deleteOne();

      const user = await User.findById(req.id);
      const index = user.posts.indexOf(req.params.id)
      user.posts.splice(index, 1);

      await user.save()

      res.status(201).json({
         message: "Post Deleted!"
      })

   } catch (error) {
      res.status(500).json({
         message: error.message
      })
   }
}

const getPostofFollowing = async (req, res) => {
   try {
      const user = await User.findById(req.id);
      const posts = await Post.find({
         owner: {
            $in: user.following,
         },
      });
      
      res.status(201).json({
         posts,
      })
   } catch (error) {
      res.status(500).json({
         message: error.message
      })
   }
} 

module.exports = { createPost, likeAndUnlikePost, deletePost, getPostofFollowing }