const express = require('express')
const {createPost, likeAndUnlikePost, deletePost, getPostofFollowing, addComment, deleteComment, getMyPosts} = require('../controllers/post')
const { isauthenticated } = require('../middleware/userauth')

const router = express.Router()

router.post('/createpost', isauthenticated, createPost)
router.get('/likeUnlike/:id', isauthenticated, likeAndUnlikePost)
router.delete('/deletePost/:id', isauthenticated, deletePost)
router.get('/myPosts', isauthenticated, getMyPosts)
router.put('/postComment/:id', isauthenticated, addComment)
router.delete('/deleteComment/:id', isauthenticated, deleteComment)

module.exports = router