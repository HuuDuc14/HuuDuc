import Brand from "../models/brandModel.js"


const getListBrand = async (req, res) => {
    try {
        const brands = await Brand.find()

        res.status(200).json(
            brands
        )
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy danh sách thương hiệu"
        })
    }
}

const createBrand = async (req, res) => {
    const { nameBrand } = req.body

    try {
        const newBrand = new Brand({
            name: nameBrand
        })

        await newBrand.save()
        res.status(200).json({ message: 'Tạo thương hiệu thành công', brand: newBrand });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo thương hiệu'});
    }
}

export {
    getListBrand,
    createBrand
}