import express from "express"
import { createBrand, getListBrand } from "../Controllers/brandController.js"

const router = express.Router()

router.post("/create", createBrand)
router.get("/", getListBrand)

export default router