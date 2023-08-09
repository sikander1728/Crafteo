const express = require('express')
const { createPost, likeAndUnlikePost, deletePost, addComment,
    deleteComment, getMyPosts, getUserPosts } = require('../controllers/post')
const { isauthenticated } = require('../middleware/userauth')
const { getPostofFollowing } = require('../controllers/post')

const router = express.Router()

router.post('/createpost', isauthenticated, createPost)
router.get('/likeUnlike/:id', isauthenticated, likeAndUnlikePost)
router.delete('/deletePost/:id', isauthenticated, deletePost)
router.get('/myPosts', isauthenticated, getMyPosts)
router.get('/userPosts/:username', isauthenticated, getUserPosts)
router.put('/postComment/:id', isauthenticated, addComment)
router.delete('/deleteComment/:id', isauthenticated, deleteComment)
router.get('/postsoffollowing', isauthenticated, getPostofFollowing)

module.exports = router