import express from 'express';
import  { productReview, review } from '../Controllers/ReviewController.js';

const router = express.Router()

router.get('/ProductReview/:productId', productReview)
router.post('/create/:userId', review)

export default router