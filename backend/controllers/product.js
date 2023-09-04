require('dotenv').config()
const Product = require('../models/Product')
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

const createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            category,
            stockQuantity,
            images,
        } = req.body;
        const seller = req.id;
        const product = new Product({
            title,
            description,
            price,
            category,
            seller,
            images,
            stockQuantity,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        if (products) {
            res.status(200).json({ products });
        } else {
            res.status(404).json({ message: "No Products Found!" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const productSearch = async (req, res) => {
    const { query } = req.query;
    try {
        console.log(query)
        if (!query || query.trim() === '') {
            res.json({
                message: "No Query Found !"
            });
        } else {
            const products = await Product.find({
                $or: [
                    { title: { $regex: new RegExp(query, 'i') } }
                ],
            });

            if (products.length > 0) {
                res.json(products);
            } else {
                res.json("No Products Found")
            }
        }
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error });
    }
}

module.exports = { createProduct, getAllProducts, productSearch }