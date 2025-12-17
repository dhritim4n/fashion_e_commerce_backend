import error from "mongoose/lib/error/index.js"
import { Product } from "../models/product.model.js"

const getProducts = async (req, res) => {

    try {

        const products = await Product.find({})

        return res.status(201).json({
            "success": true,
            "products": products
        })

    } catch (error) {
        return res.status(401).json({
            "message": error.message
        })
    }

}

const addProduct = async (req, res) => {

    const { name, price, category, colors, sizes, countInStock, rating } = req.body
    try {

        await Product.create({
            name,
            price,
            category,
            colors,
            sizes,
            countInStock,
            rating,

        })

        return res.status(201).json({
            "success": true,
            "message": "Product Added !!"
        })

    } catch (error) {
        return res.status(401).json({
            "message": error.message
        })
    }

}
const getProductById = async (req, res) => {
    const id = req.params.id
    try {

        const product = await Product.find({ _id: id })

        return res.status(201).json({
            "success": true,
            "product": product
        })

    } catch (error) {
        return res.status(401).json({
            "message": error.message
        })
    }

}
const searchProduct = async (req, res) => {
    const { q } = req.query;

    try {
        if (!q) {
            throw new error("Invalid Search Query !")
        }

        const products = await Product.find({
            name: {
            $regex: q,
            $options: 'i',
          }
        })

        return res.status(201).json({
            "success": true,
            "product": products
        })

    } catch (error) {
        return res.status(401).json({
            "message": error.message
        })
    }

}
const findProduct = async (req, res) => {

    const query = req.query

    if(!query){
        throw new error("Invalid Query !!")
    }
    try {
        

        const products = await Product.find(query)

        return res.status(201).json({
            "success": true,
            "product": products
        })

    } catch (error) {
        return res.status(401).json({
            "message": error.message
        })
    }

}


export {
    addProduct,
    getProducts,
    getProductById,
    searchProduct,
    findProduct
}