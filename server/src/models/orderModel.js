import mongoose from "mongoose"


const ordersSchema = new mongoose.Schema({
    userId: String,
    name: String,
    phone: String,
    provinceCode: Number,
    districtCode: Number,
    wardCode: Number,
    address: String,
    total: Number,
    items: [
        { 
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number
        }],
    status: { type: String, default: 'Chờ xác nhận'},
}, {
    versionKey: false,
    timestamps: true
})

ordersSchema.virtual('provinceData', {
    ref: 'Province',         // Tên của model liên kết
    localField: 'provinceCode', // Trường trong bảng Order
    foreignField: 'code',       // Trường trong bảng Province
    justOne: true               // Chỉ lấy một bản ghi
});

ordersSchema.virtual('districtData', {
    ref: 'District',         // Tên của model liên kết
    localField: 'districtCode', // Trường trong bảng Order
    foreignField: 'code',      
    justOne: true 
})

ordersSchema.virtual('wardData', {
    ref: 'Ward',         // Tên của model liên kết
    localField: 'wardCode', // Trường trong bảng Order
    foreignField: 'code',      
    justOne: true 
})

// Cần `setOptions` để cho phép Mongoose sử dụng Virtual
ordersSchema.set('toObject', { virtuals: true });
ordersSchema.set('toJSON', { virtuals: true });

const Order = mongoose.model("Order", ordersSchema)

export default Order