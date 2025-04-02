import mongoose from "mongoose";

const connectDatabase = async () => {
    await mongoose.connect("mongodb://localhost:27017/HuuDuc", {})
        .then(() => console.log('connect database successfuly'))
        .catch((error) => console.log('connect database faill'))
}

export default connectDatabase