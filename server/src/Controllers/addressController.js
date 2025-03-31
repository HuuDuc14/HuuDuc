import District from "../models/districtModel.js";
import Province from "../models/ProvinceModel.js"
import Ward from "../models/wardModel.js";


const getProvince = async (req, res) => {
    try {
        const provinces = await Province.find()
        res.status(200).json(provinces)
    } catch (error) {
        console.error("Lỗi khi lấy tỉnh: ", error);      
        res.status(500).json("Lỗi khi lấy tỉnh")
    }
}

const getDistrict = async (req, res) => {
    const provinceCode = req.params.provinceCode
    try {
        const districts = await District.find({provinceCode})
        res.status(200).json(districts)
    } catch (error) {
        console.error("Lỗi khi lấy huyện/ quận: ", error);      
        res.status(500).json("Lỗi khi lấy huyện/ quận")
    }
}

const getWard = async (req, res) => {
    const districtCode = req.params.districtCode
    try {
        const wards = await Ward.find({districtCode})
        res.status(200).json(wards)
    } catch (error) {
        console.error("Lỗi khi lấy xã/ phường: ", error);      
        res.status(500).json("Lỗi khi lấy xã/ phường")
    }
}

export {
    getProvince,
    getDistrict,
    getWard
}