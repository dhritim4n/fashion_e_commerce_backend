import { Router } from "express";
import {
    getCart,
    addToCart,
    removeFromCart
} from "../controllers/cart.controller.js"
import checkLogin from "../middlewares/checkLogin.js";


const router = Router()
router.use(checkLogin)
router.get("/getCart", getCart)
router.post("/addToCart", addToCart)
router.post("/removeFromCart", removeFromCart)

export default router;