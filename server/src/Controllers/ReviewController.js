import Review from "../models/ProductReviewModel.js"

const review = async (req, res) => {
    const user = req.params.userId
    const {rateCount, product, comment} = req.body
    try {
        let review = new Review({
            user,
            rateCount,
            product,
            comment
        })
        await review.save()
        res.status(200).json({message: "Đánh giá thành công", review})
    } catch (error) {
        console.log("Lỗi khi đánh giá");
        res.status(500).json({message: "Lỗi khi đánh giá"})
    }
}

const productReview = async (req, res) => {
    const product = req.params.productId

    try {
        const reviews = await Review.find({product})
        .populate([
            'product',
            'user'
        ])

        res.status(200).json({message: "Lấy đánh giá sản phẩm thành công", reviews})
    } catch (error) {
        res.status(500).json({message: "Lỗi khi lấy đánh giá sản phẩm"})
    }
}

export {
    review,
    productReview
} 