const express = require('express')
const { signup, signin, getUser,
   sendloginlink, verifyForgotPasswordLink, getPostofFollowing,
   resetPassword, followUnfollowUser, logout, updateProfile, deleteProfile,
   getUserProfile, getAllUsers, userSearch } = require('../controllers/user')
const { isauthenticated, refreshToken } = require('../middleware/userauth')

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/logout', logout)
router.get('/users', isauthenticated, getUser)
router.get('/refreshToken', refreshToken, isauthenticated, getUser)
router.post('/sendloginlink', sendloginlink)
router.get('/resetPassword/:id/:token', verifyForgotPasswordLink)
router.post('/:id/:token', resetPassword)
router.get('/followUnfollowUser/:id', isauthenticated, followUnfollowUser)
router.put('/updateProfile', isauthenticated, updateProfile)
router.delete('/deleteProfile', isauthenticated, deleteProfile)
router.get('/userProfile/:username', isauthenticated, getUserProfile)
router.get('/allUsers', isauthenticated, getAllUsers)
router.get('/postsoffollowing', isauthenticated, getPostofFollowing)
router.get('/searchUser', isauthenticated, userSearch)

module.exports = router