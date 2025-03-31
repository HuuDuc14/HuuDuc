import mongoose from "mongoose";

const Province = mongoose.model('Province', new mongoose.Schema({
    name: String,
    code: Number,
}));
  
export default Province