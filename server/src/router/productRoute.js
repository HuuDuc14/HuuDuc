import express from 'express';
import { createProduct, deleteProduct, detailsProduct, product, updateQuantity } from '../Controllers/productController.js';

const router = express.Router()

router.post('/create', createProduct)
router.post("/delete/:id", deleteProduct)
router.post("/update-quantity/:productId", updateQuantity)
router.get('/product-details/:id', detailsProduct)
router.get('/', product)



export default router