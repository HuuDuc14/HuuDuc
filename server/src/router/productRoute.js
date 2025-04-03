import express from 'express';
import { createProduct, deleteProduct, detailsProduct, product, updatePrice, updateQuantity } from '../Controllers/productController.js';

const router = express.Router()

router.post('/create', createProduct)
router.post("/delete/:id", deleteProduct)
router.post("/update-quantity/:productId", updateQuantity)
router.post("/update-price/:productId", updatePrice)
router.get('/product-details/:id', detailsProduct)
router.get('/', product)



export default router