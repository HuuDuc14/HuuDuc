import mongoose from "mongoose";

const District = mongoose.model('District', new mongoose.Schema({
    name: String,
    provinceCode: Number,
    code: Number,
}));

export default District