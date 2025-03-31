import mongoose from "mongoose";

const connectDatabase = () => {
    mongoose.connect("mongodb://localhost:27017/xbeat", {})
        .then(() => console.log('connect database successfuly'))
        .catch((error) => console.log('connect database faill'))
}

export default connectDatabase