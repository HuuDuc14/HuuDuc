import express from 'express';
import { allOrder, getOrder, orderUser, updateStatus } from '../Controllers/orderController.js';

const router = express.Router()

router.get("/all", allOrder)
router.get("/:id", getOrder)
router.post("/:userId", orderUser)
router.post("/updateStatus/:orderId", updateStatus)




export default router