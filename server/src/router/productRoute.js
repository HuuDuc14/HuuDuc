import express from 'express';
import { createProduct, deleteProduct, detailsProduct, product } from '../Controllers/productController.js';

const router = express.Router()

router.post('/create', createProduct)
router.post("/delete/:id", deleteProduct)
router.get('/product-details/:id', detailsProduct)
router.get('/', product)



export default router