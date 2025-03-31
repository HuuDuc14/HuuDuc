import mongoose from "mongoose";


const Ward = mongoose.model('Ward', new mongoose.Schema({
    name: String,
    districtCode: Number,
    code: Number,
}));

export default Ward