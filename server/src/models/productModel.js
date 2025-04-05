import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    images: {
        type: [String]
    },
    brand: {
        type: String
    },
    brandId: {type: mongoose.Schema.Types.ObjectId, ref: "Brand"}, 
    title: {
        type: String
    },
    info: {
        type: String
    },
    category: {
        type: String
    },
    type: {
        type: String
    },
    finalPrice: {
        type: Number
    },
    quantity: {
        type: Number
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product
