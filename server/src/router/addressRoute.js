import express from 'express';
import { getDistrict, getProvince, getWard } from '../Controllers/addressController.js';


const router = express.Router()

router.get("/province", getProvince)
router.get("/district/:provinceCode", getDistrict)
router.get("/ward/:districtCode", getWard)

export default router