import Product from "../models/product.model.js";
import ErrorHandler from '../utils/errorHandler.js';
import path from 'path';


export const createProduct = async (req, res, next) => {
    const product_images = [];
    req.files.map((file) => (
        product_images.push('/' + file.destination + file.filename)
    ));

    const product = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_image: product_images,
        product_category: req.body.product_category,
        product_stock: req.body.product_stock,
        product_status: typeof req.body.product_status == 'string' ? Boolean(req.body.product_status) : req.body.product_status,
        product_rating: req.body.product_rating,
        product_review: req.body.product_review,
        createdBy: req.user._id,
    });

    try {
        const data = await product.save();
        res.status(201).json({ success: true, data });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};

export const productsByGroup = async (req, res, next) => {
    try {
        const productsData = await Product.aggregate([
            {
                $group: {
                    _id: "$category",  // Grouping by category
                    productsData: { $push: "$$ROOT" } // Pushing entire product documents into an array
                }
            }
        ]);

        let data = productsData[0].productsData
        res.status(200).send({ success: true, data })
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}

export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json({ success: true, product })
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({ success: true, product });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json({ success: true, msg: 'Product deleted' });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

