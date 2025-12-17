import { Router } from "express";
import { 
    addProduct,
    getProducts,
    getProductById,
    searchProduct,
    findProduct
 } from "../controllers/product.controller.js";

const router = Router()

router.get('/all', getProducts)
router.get('/id/:id', getProductById)
router.get('/search', searchProduct)
router.get('/find', findProduct)
router.post('/addProduct', addProduct)

export default router;