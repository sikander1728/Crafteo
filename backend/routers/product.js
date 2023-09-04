const express = require('express')
const { sellerAuthMiddleware, isauthenticated } = require('../middleware/userauth')
const { createProduct, getAllProducts, productSearch } = require('../controllers/product')


const router = express.Router()

router.post('/createProduct', isauthenticated, sellerAuthMiddleware('seller'), createProduct)
router.get('/allProducts', isauthenticated, getAllProducts)
router.get('/searchProduct', isauthenticated, productSearch)

module.exports = router 