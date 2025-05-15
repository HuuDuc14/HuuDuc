import express from "express"
import { createCategory, deleteCategory, getListCategory } from "../Controllers/categoryController.js"

const router = express.Router()


router.post("/create", createCategory)
router.get("/delete/:categoryId", deleteCategory)
router.get("/", getListCategory)

export default router