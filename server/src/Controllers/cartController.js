import express from "express"
import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"


const addCart = async (req, res) => {
    const { userId, items } = req.body
    
    try {
        let cart = await Cart.findOne({ userId })


        for (const { productId, quantity } of items) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Sản phẩm không tồn tại" });
            }
            
            const cartItem = cart ? cart.items.find(item => item.productId.toString() === productId.toString()) : null;
            const newQuantity = cartItem ? cartItem.quantity + quantity : quantity;
            
            if (newQuantity > product.quantity) {
                return res.status(400).json({ message: `Còn ${product.quantity} sản phẩm trong kho` });
            }
        }

        if (cart) {
            items.forEach(({ productId, quantity }) => {
                const existingItem = cart.items.find(
                    (item) => item.productId.toString() === productId.toString()
                )

                if (existingItem) {
                    existingItem.quantity += quantity
                } else {
                    cart.items.push({ productId, quantity })
                }
            })
        } else {
            cart = new Cart({ userId, items })
        }

        await cart.save()
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: "loi khi them san pham vao gio hang" });
    }
}

const getCart = async (req, res) => {
    const userId = req.params.userId
    try {
        
        const cart = await Cart.findOne({ userId }).populate('items.productId')

        if(cart){
            res.status(200).json(cart || { item: [] })           
        } else {
            res.status(200).json({ items: [] })
        }
        
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy giỏ hàng" });
    }
}

const deleteItem = async (req, res) => {
    const { userId, id } = req.params
    try {
        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return res.status(404).json({ message: "Giỏ hàng không tồn tại" })
        }

        cart.items = cart.items.filter((item) => item._id.toString() !== id)
        await cart.save();
        const updatedCart = await Cart.findOne({ userId }).populate("items.productId");
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa sản phẩm trong giỏ hàng" });
    }
}

const decrementItem = async (req, res) => {
    const { userId, id } = req.params

    try {
        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return res.status(404).json({ message: "Giỏ hàng không tồn tại" })
        }

        const item = cart.items.find(item => item._id.toString() === id)

        if (!item) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
        }

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.items = cart.items.filter((item) => item._id.toString() !== id)
        }
        await cart.save();
        const updatedCart = await Cart.findOne({ userId }).populate("items.productId"); // Lấy lại giỏ hàng mới

        res.status(200).json(updatedCart);

    } catch (error) {
        res.status(500).json({ message: "Lỗi khi giảm số lượng sản phẩm trong giỏ hàng" });
    }
}

const incrementItem = async (req, res) => {
    const { userId, id } = req.params



    try {
        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(404).json({ message: "Giỏ hàng không tồn tại" })
        }
        const item = cart.items.find(item => item._id.toString() === id)

        if(!item){
            return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng" })
        }

        item.quantity += 1
        const product = await Product.findById(item.productId);
        if(item.quantity > product.quantity) {
            return res.status(400).json({ message: `Còn ${product.quantity} sản phẩm trong kho` });
        }
        

        await cart.save();
        const updatedCart = await Cart.findOne({ userId }).populate("items.productId");

        res.status(200).json(updatedCart);

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Lỗi khi tăng số lượng sản phẩm trong giỏ hàng" });
    }

}

const clearCart = async (req, res) => {
    const userId = req.params.userId

    try {
        await Cart.updateOne({userId}, {items: []})
        res.status(200).json({ message: "Xóa giỏ hàng thành công" })
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa giỏ hàng" });
    }
}

export {
    addCart,
    getCart,
    deleteItem,
    decrementItem,
    incrementItem,
    clearCart
}