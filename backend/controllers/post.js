require('dotenv').config()
const Post = require('../models/Post')

const createPost = async (req, res) => {
   try {
      const newPostData = {
         caption: req.body.caption,
         image: {
            public_id: "req.body.public_id",
            url: "req.body.url"
         },
         owner: req.user._id,
      }

      const newPost = await Post.create(newPostData)

      res.status(201).json({
         message: "Post created successfully",
         post: newPost
      })
   } catch (error) {
      res.status(500).json({ message: error.message})
   }
}

module.exports = {createPost}