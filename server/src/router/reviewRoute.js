import express from 'express';
import  { countRateAndRatingsOfProduct, productReview, review } from '../Controllers/ReviewController.js';

const router = express.Router()

router.get('/ProductReview/:productId', productReview)
router.get('/counRateAndRatings/:productId', countRateAndRatingsOfProduct)
router.post('/create/:userId', review)

export default router