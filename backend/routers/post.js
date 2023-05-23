const express = require('express')
const {createPost, likeAndUnlikePost, deletePost, getPostofFollowing} = require('../controllers/post')
const { isauthenticated } = require('../middleware/userauth')

const router = express.Router()

router.post('/createpost', isauthenticated, createPost)
router.get('/likeUnlike/:id', isauthenticated, likeAndUnlikePost)
router.delete('/deletePost/:id', isauthenticated, deletePost)
router.get('/postsoffollowing', isauthenticated, getPostofFollowing)

module.exports = router