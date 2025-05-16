import Category from "../models/categoryModel.js"
import Product from "../models/productModel.js"


const createCategory = async (req, res) => {
    const {categoryName} = req.body
    try {
        const newCategory = new Category({
            name: categoryName
        })

        await newCategory.save()
        res.status(200).json({ message: 'Thêm danh mục thành công', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm danh mục'});
    }
}

const getListCategory = async (req, res) => {
    try {
        const categories = await Category.find()

        const productCounts = await Product.aggregate([
            {
                $group: {
                    _id: "$category", // group theo category
                    count: { $sum: 1 } // đếm số lượng
                }
            } 
        ]);

        const countMap = {};
        productCounts.forEach(item => {
            countMap[item._id.toString()] = item.count;
        });

        const categoriesWithCount = categories.map(cat => ({
            _id: cat._id,
            name: cat.name, // hoặc các field khác
            productCount: countMap[cat._id.toString()] || 0
        }));
        
        res.status(200).json({categories: categoriesWithCount})
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy danh mục"
        })
    }
}

const deleteCategory = async (req, res) => {
    const {categoryId} = req.params

    try {
        const category = await Category.findByIdAndDelete(categoryId)
        res.status(200).json({
            message: `Đã xóa ${category.name}`,
            category
        })
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa danh mục'});
    }
}

export {
    createCategory,
    getListCategory,
    deleteCategory
}