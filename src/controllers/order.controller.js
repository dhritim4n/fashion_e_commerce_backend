import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import errorResponse from "../utils/errorResponse.js";
import mongoose from "mongoose";

const placeOrder = async (req, res) => {
    const { cartId, shippingAddress, paymentMethod } = req.body
    const userId = req.userId
    try {
        if (!shippingAddress) {
            throw new Error("Invalid Address")
        }
        var cart = await Cart.findById(cartId)


        if (!cart) {
            throw new Error("Cart Not Found !")
        }
        var items = cart.items

        if (!items.length) {
            throw new Error("Cart Empty !")
        }
        var total = cart.total
        await Order.create({
            userId,
            items,
            total,
            shippingAddress,
            paymentMethod
        })
        cart.items = []
        cart.total = 0
        await cart.save()

        return res.status(201).json({
            "success": true,
            "message": "Order Placed !!"
        })

    } catch (error) {
        errorResponse(error, res)
    }
};

const getUserOrderById = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params; // URL: /orders/:orderId

        if (!userId) {
            return res.status(401).json({ success: false, message: "Auth Failure !!" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Order ID" });
        }

        // Ensure the order belongs to the authenticated user
        const order = await Order.findOne({ _id:id, userId })
            .populate("items.productId", "name price");

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found!" });
        }

        return res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        errorResponse(error, res);
    }
};


const getUserAllOrders = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Auth Failure !!" });
        }

        const orders = await Order.find({ userId })
            .populate("items.productId", "name price")
            .sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found!" });
        }

        return res.status(200).json({
            success: true,
            orders,
            totalOrders: orders.length,
        });
    } catch (error) {
        errorResponse(error, res);
    }
};


const cancelUserOrder = async (req, res) => {
    const { orderId } = req.body;
    const userId = req.userId;

    try {
        if (!userId) {
            return res.status(401).json({ success: false, message: "Auth Failure" });
        }

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ success: false, message: "Invalid order ID" });
        }

        const order = await Order.findOneAndDelete({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order does not exist" });
        }

        return res.status(200).json({ success: true, message: "Order Cancelled!" });
    } catch (error) {
        errorResponse(error, res);
    }
};

export {
    placeOrder,
    getUserOrderById,
    getUserAllOrders,
    cancelUserOrder
}