import path from 'path';
import Product from '../models/productModel.js';
import Review from '../models/ProductReviewModel.js';

const product = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "lấy sản phẩm không thàng công" })
    }
}

const detailsProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        const ratings = await Review.countDocuments({product: id})
        const rates = await Review.find({product: id}) 

        let totalRate = 0
        for(let rate of rates) {
            totalRate += rate.rateCount
        }

        const countRate = parseInt(totalRate/ratings)
        

        res.status(200).json({product, ratings, countRate})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "lấy sản phẩm không thàng công" })
    }
}

const createProduct = async (req, res) => {
    const { title, category, brand, info, type, finalPrice, quantity } = req.body;
    const files = req.files?.images; // Lấy ảnh từ req.files
    
    if (!files) {
        return res.status(400).json({ message: "Chưa có ảnh" });
    }

    let imagePaths = [];
    if (Array.isArray(files)) {
        // Nếu có nhiều ảnh
        for (const file of files) {
            const filePath = `${file.name}`;
            await file.mv(path.join('src/public', 'images', file.name)); // Lưu ảnh vào thư mục public/images
            imagePaths.push(filePath);
        }
    } else {
        // Nếu chỉ có một ảnh
        const filePath = `${files.name}`;
        await files.mv(path.join('src/public', 'images', files.name)); // Lưu ảnh vào thư mục public/images
        imagePaths.push(filePath);
    }

    try {     
        const newProduct = new Product({
            title,
            category,
            brand,
            info,
            type,
            finalPrice,
            quantity,
            images: imagePaths, // Lưu đường dẫn ảnh vào database
        });

        await newProduct.save();
        res.status(200).json({ message: 'Thêm sản phẩm thành công', product: newProduct });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Lỗi khi thêm sản phẩm', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findByIdAndDelete(id)
        res.status(200).json({message: "Xóa sản phẩm thành công", product: product})
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error: error.message });
    }
}

const updateQuantity = async (req, res) => {
    const productId = req.params.productId
    const {quantity} = req.body
    try {
        const product = await Product.findById(productId)
        product.quantity = quantity
        product.save()

        res.status(200).json({
            message: `Đã cập nhật số lượng ${product.title}`
        })
    } catch (error) {
        res.status(500).json({
            message: `Cập nhật số lượng không thành công`
        })
    }
    
}

const updatePrice = async (req, res) => {
    const productId = req.params.productId
    const {price} = req.body
    

    try {
        const product = await Product.findById(productId)
        product.finalPrice = price
        product.save()

        res.status(200).json({
            message: `Đã cập nhật giá ${product.title}`
        })
    } catch (error) {
        res.status(500).json({
            message: `Cập nhật giá không thành công`
        })
    }
}

export {
    product,
    detailsProduct,
    createProduct,
    deleteProduct,
    updateQuantity,
    updatePrice
}