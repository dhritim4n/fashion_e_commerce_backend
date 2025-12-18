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
    const userId = req.userId
    var { productId, quantity, color, size } = req.body
    try {
        const product = await Product.findById(productId)
        const user = await User.findById(userId)
        var cart = await Cart.findOne({ userId })

        if (!user) {
            throw new Error("Auth Error !!")
        }

        if (!product) {
            throw new Error("Product Not Found!!")
        }
        if (!color) {
            color = product.colors[0]
        }
        if (!size) {
            size = product.sizes[0]
        }

        if (!cart) {
            cart = await createCart(userId)
        }

        // find same product + color + size
        const itemIndex = cart.items.findIndex(
            (item) =>
                item.productId.toString() === productId &&
                item.color === color &&
                item.size === size
        );

        if (itemIndex > -1) {
            // item exists → increase quantity
            cart.items[itemIndex].quantity += Number(quantity) || 1;
        } else {
            // item does not exist → add new
            cart.items.push({
                productId: productId,
                quantity: quantity || 1,
                color,
                size,
            });
        }
        await cart.save()


        return res.status(201).json({
            "success": true,
            "message": "product added"
        })
    } catch (error) {
        errorResponse(error, res)
    }
}

const removeFromCart = async (req, res) => {
    const userId = req.userId
    var { productId, color, size } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("Auth Error!!");
        }

        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product Not Found!!");
        }

        var cart = await Cart.findOne({ userId });
        if (!cart) {
            throw new Error("Cart not found for user");
        }

        // Use default color/size if not provided (optional)
        if (!color) {
            color = product.colors[0];
        }
        if (!size) {
            size = product.sizes[0];
        }

        // Find the index of the matching item
        const itemIndex = cart.items.findIndex(
            (item) =>
                item.productId.toString() === productId &&
                item.color === color &&
                item.size === size
        );

        if (itemIndex === -1) {
            throw new Error("Item not found in cart");
        }

        // Remove item from the array
        cart.items.splice(itemIndex, 1);

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
