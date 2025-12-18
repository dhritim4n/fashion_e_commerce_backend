import { Cart } from "../models/cart.model.js"

const createCart = async (userId) => {
    try {
        return await Cart.create({
            userId,
            items: [],
            total: 0

        })

    } catch (error) {
        throw error
    }
}

export {
    createCart
}