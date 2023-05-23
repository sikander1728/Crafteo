const express = require('express')
const { signup, signin, getUser,
   sendloginlink, verifyForgotPasswordLink,
   resetPassword, followUnfollowUser, logout, updateProfile } = require('../controllers/user')
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

module.exports = router