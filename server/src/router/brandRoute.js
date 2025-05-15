import express from "express"
import { createBrand, deleteBrand, getListBrand } from "../Controllers/brandController.js"

const router = express.Router()

router.post("/create", createBrand)
router.post("/delete/:brandId", deleteBrand)
router.get("/", getListBrand)

export default router