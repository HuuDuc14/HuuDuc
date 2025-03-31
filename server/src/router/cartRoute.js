import express from 'express';
import { addCart, clearCart, decrementItem, deleteItem, getCart, incrementItem } from '../Controllers/cartController.js';

const router = express.Router()

router.post("/increment/:userId/:id", incrementItem)
router.post("/decrement/:userId/:id", decrementItem)
router.post("/deleteCart/:userId", clearCart)
router.delete("/:userId/:id", deleteItem)
router.get("/:userId", getCart)
router.post("/", addCart)



export default router