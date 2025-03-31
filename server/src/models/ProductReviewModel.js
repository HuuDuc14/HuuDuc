import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    comment: String,
    rateCount: Number
}, {
    timestamps: true
});

const Review = mongoose.model("Review", reviewSchema)

export default Review