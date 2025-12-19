import { Router } from "express";
import { 
    placeOrder,
    getUserOrderById,
    getUserAllOrders,
    cancelUserOrder
 } from "../controllers/order.controller.js";
import checkLogin from "../middlewares/checkLogin.js";

const router = Router()
router.use(checkLogin)
router.post("/placeOrder",placeOrder)
router.get("/all",getUserAllOrders)
router.get("/id/:id",getUserOrderById)
router.post("/cancel",cancelUserOrder)


export default router;