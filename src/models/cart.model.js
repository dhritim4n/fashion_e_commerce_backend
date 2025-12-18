import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    items: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product"
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: 1
                },
                color: {
                    type: String,
                    required: true
                },
                size: {
                    type: String,
                    required: true
                }

            }
        ],
        default: []
    },
    total: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

export const Cart = mongoose.model("Cart", cartSchema)