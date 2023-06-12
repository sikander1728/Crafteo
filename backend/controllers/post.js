require('dotenv').config()
const Post = require('../models/Post')
const User = require('../models/User')
const cloudinary = require('cloudinary');

cloudinary.config({
   cloud_name: process.env.cloud_name,
   api_key: process.env.api_key,
   api_secret: process.env.api_secret,
});

const createPost = async (req, res) => {
   try {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
         folder: "posts",
      })
      const newPostData = {
         caption: req.body.caption,
         image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
         },
         owner: req.id,
      }
      const post = await Post.create(newPostData)
      console.log('post created')

      const user = await User.findById(req.id)
      console.log("object user", user)
      user.posts.unshift(post._id)

      await user.save()
      res.status(201).json({
         message: "Post Created!",
         post,
      })
   } catch (error) {
      res.status(500).json({ message: error.message })
   }
}

const likeAndUnlikePost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);

      if (!post) {
         return res.status(404).json({
            message: "Post Not FOund!"
         })
      }
      if (post.likes.some(like => like.equals(req.id))) {
         const index = post.likes.indexOf(req.id)
         post.likes.splice(index, 1)

         await post.save();

         return res.status(201).json({
            message: "Post Unliked"
         })
      } else {
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

      if (!post) {
         return res.status(404).json({
            message: "Post Not Found!"
         })
      }

      if (post.owner.toString() !== req.id.toString()) {
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

const addComment = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);

      if (!post) {
         return res.status(404).json({
            message: "Post Not Found!"
         })
      }

      const newComment = {
         user: req.id,
         comment: req.body.comment
      }

      post.comments.push(newComment)
      await post.save()

      res.status(200).json({
         message: "Comment Posted!"
      })

   } catch (error) {
      res.status(500).json({
         message: error.message
      })
   }
}

const deleteComment = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);

      if (!post) {
         return res.status(404).json({
            message: "Post Not Found!"
         })
      }

      if (post.owner.toString() === req.id.toString()) {
         if (!req.body.commentId) {
            return res.status(400).json({
               message: "CommentId is required!"
            });
         }

         const commentIndex = post.comments.findIndex(item => item._id.toString() === req.body.commentId.toString());

         if (commentIndex === -1) {
            return res.status(404).json({
               message: "Comment Not Found!"
            });
         }

         post.comments.splice(commentIndex, 1);
         await post.save();

         return res.status(200).json({
            message: "Selected Comment has been deleted!"
         });

      } else {
         post.comments.forEach((item, index) => {
            if (item.user.toString() === req.id.toString()) {
               return post.comments.splice(index, 1)
            }
         })

         await post.save();
         res.status(200).json({
            message: "Your Comment has deleted!"
         })
      }

   } catch (error) {
      res.status(500).json({
         message: error.message
      })
   }
}

module.exports = { createPost, likeAndUnlikePost, deletePost, getPostofFollowing, addComment, deleteComment }