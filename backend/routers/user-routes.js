const express = require('express')
const { signup , signin } = require('../controllers/user-controller')
const {verifyToken, getUser} = require('../middleware/userauth')

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/users', verifyToken, getUser)

module.exports = router