import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { createCart } from "../utils/cart.utils.js";
import errorResponse from "../utils/errorResponse.js";

const getCart = async (req, res) => {
    const userId = req.userId
    try {
        var cart = await Cart.find({ userId })

        if (!cart.length) {
            cart = await createCart(userId)
        }

        return res.status(201).json({
            "status": true,
            "cart": cart

        })
    } catch (error) {
        errorResponse(error, res)
    }
}

const addToCart = async (req, res) => {
    const userId = req.userId;
    let { productId, quantity, color, size } = req.body;

    try {
        const product = await Product.findById(productId);
        const user = await User.findById(userId);
        let cart = await Cart.findOne({ userId });

        if (!user) throw new Error("Auth Error !!");
        if (!product) throw new Error("Product Not Found!!");

        const qty = Number(quantity) || 1;

        if (!color) color = product.colors[0];
        if (!size) size = product.sizes[0];

        if (!cart) {
            cart = await createCart(userId);
        }

        const itemIndex = cart.items.findIndex(
            (item) =>
                item.productId.toString() === productId &&
                item.color === color &&
                item.size === size
        );

        if (itemIndex > -1) {
            // item exists
            cart.items[itemIndex].quantity += qty;
            cart.items[itemIndex].total += qty * product.price;
            cart.total += qty * product.price;
        } else {
            // new item
            const itemTotal = qty * product.price;

            cart.items.push({
                productId,
                quantity: qty,
                color,
                size,
                total: itemTotal,
            });

            cart.total += itemTotal;
        }

        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Product added to cart",
        });
    } catch (error) {
        errorResponse(error, res);
    }
};

const removeFromCart = async (req, res) => {
    const userId = req.userId;
    let { productId, color, size } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "Auth Error!!" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product Not Found!!" });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // Default color/size if not provided
        if (!color) color = product.colors[0];
        if (!size) size = product.sizes[0];

        const itemIndex = cart.items.findIndex(
            (item) =>
                item.productId.toString() === productId &&
                item.color === color &&
                item.size === size
        );

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        // 🔥 Subtract item total from cart total
        const itemTotal = cart.items[itemIndex].quantity * product.price;
        cart.total -= itemTotal;

        // Remove item
        cart.items.splice(itemIndex, 1);

        // Prevent negative totals
        if (cart.total < 0) cart.total = 0;

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Item removed from cart",
        });
    } catch (error) {
        errorResponse(error, res);
    }
};





export {
    getCart,
    addToCart,
    removeFromCart
}
