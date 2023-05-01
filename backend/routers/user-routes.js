const express = require('express')
const { signup , signin, getUser, sendloginlink } = require('../controllers/user-controller')
const { isauthenticated, refreshToken } = require('../middleware/userauth')

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/users', isauthenticated, getUser)
router.get('/refreshToken', refreshToken, isauthenticated, getUser)
router.post('/sendloginlink', sendloginlink)

module.exports = router