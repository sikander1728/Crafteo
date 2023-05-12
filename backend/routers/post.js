const express = require('express')
const {createPost} = require('../controllers/post')

const router = express.Router()

router.post('/createpost', createPost)

module.exports = router