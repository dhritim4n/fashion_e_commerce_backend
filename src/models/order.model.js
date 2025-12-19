import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
        required: true
    },

    total: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "card", "upi", "paypal"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },

    shippingAddress: {
      type:String,
      required: true
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
