import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    colors: {
        type: [String],
        default: []
    },
    sizes: {
        type: [String],
        default: []
    },
    countInStock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        index: true 
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
});


const Product = mongoose.model('Product', productSchema);

export { Product };