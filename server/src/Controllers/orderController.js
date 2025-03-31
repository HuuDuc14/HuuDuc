import express from 'express';
import Order from '../models/orderModel.js';

const orderUser = async (req, res) => {
    const userId = req.params.userId
    const {cart, phone, name, provinceCode, districtCode, wardCode, address, total} = req.body

    if (!userId || !cart || cart.length === 0) {
        return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }

    try {
        const newOrder = new Order({
            userId,
            phone, 
            name, 
            provinceCode, 
            districtCode, 
            wardCode, 
            address,
            total,
            items: cart.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity
            }))
        })

        const saveOrder = await newOrder.save()

        res.status(200).json({
            message: "Đặt hàng thành công",
            order: saveOrder,
        });
    } catch (error) {
        res.status(500).json({
            message: "Đã có lỗi xảy ra khi tạo đơn hàng",
            error: error.message,
          });
    }
}

const getOrder = async (req, res) => {
    const userId = req.params.id

    try {
        const orders = await Order.find({userId}).populate('items.productId')
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy đơn hàng" });
    }
}

const updateStatus = async (req, res) => {
    const orderId = req.params.orderId
    const {status} = req.body
    try {
        const order = await Order.updateOne({_id: orderId}, { status })
        res.status(200).json({
            message: "Cập nhật trạng thái thành công",
            order: order
        })
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật trạng thái" });
    }
}

// Admin
const allOrder = async (req, res) => {
    try {
        const orders = await Order.find({ status: { $ne: "Đã hủy" } })
        .populate([
            'items.productId',
            'provinceData',
            'districtData',
            'wardData'
        ])
        res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Lỗi khi lấy đơn hàng" });
    }
}



export { 
    orderUser,
    getOrder,
    updateStatus,
    allOrder
}