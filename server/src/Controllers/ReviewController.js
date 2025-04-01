import Review from "../models/ProductReviewModel.js"

const review = async (req, res) => {
    const user = req.params.userId
    const { rateCount, product, comment } = req.body
    try {
        let review = new Review({
            user,
            rateCount,
            product,
            comment
        })
        await review.save()
        res.status(200).json({ message: "Đánh giá thành công", review })
    } catch (error) {
        console.log("Lỗi khi đánh giá");
        res.status(500).json({ message: "Lỗi khi đánh giá" })
    }
}

const productReview = async (req, res) => {
    const product = req.params.productId

    try {
        const reviews = await Review.find({ product })
            .populate([
                'product',
                'user'
            ])

        res.status(200).json({ message: "Lấy đánh giá sản phẩm thành công", reviews })
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy đánh giá sản phẩm" })
    }
}

const countRateAndRatingsOfProduct = async (req, res) => {
    const productId = req.params.productId

    try {
        const reviews = await Review.find({ product: productId }).select('rateCount');

        if (reviews.length === 0) {
            return res.status(200).json({ message: "Chưa có đánh giá", review: { ratings: 0, countRate: 0 } });
        }

        let totalRate = 0

        const ratings = reviews.length
        
        if (ratings > 0) {
            for (let review of reviews) {
                totalRate += review.rateCount
            }          
        }
        const countRate = parseInt(totalRate/ratings)
        res.status(200).json({ message: "Lấy đánh giá sản phẩm thành công", review: { ratings, countRate } })
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy đánh giá sản phẩm" })
    }
}

export {
    review,
    productReview,
    countRateAndRatingsOfProduct
} 