import axios from "axios";
import Province from "../models/ProvinceModel.js";
import District from "../models/districtModel.js";
import Ward from "../models/wardModel.js";

export async function loadData() { 
    try {
        // Lấy danh sách các tỉnh
        const provinces = await axios.get('https://provinces.open-api.vn/api/p');
        for (const province of provinces.data) {
            const provinceDoc = new Province({
                name: province.name,
                code: province.code,
            });
            const savedProvince = await provinceDoc.save();
        }

        const districts = await axios.get('https://provinces.open-api.vn/api/d');
        for (const district of districts.data) {
            const districtDoc = new District({
                name: district.name,
                provinceCode: district.province_code,
                code: district.code,
            });
            const saveddistrict = await districtDoc.save();
        }

        const wards = await axios.get('https://provinces.open-api.vn/api/w');
        for (const ward of wards.data) {
            const wardDoc = new Ward({
                name: ward.name,
                districtCode: ward.district_code,
                code: ward.code,
            });
            const savedWard = await wardDoc.save();
        }
        console.log('Dữ liệu đã được nhập thành công vào MongoDB!');
    } catch (error) {
        console.error('Có lỗi xảy ra khi tải hoặc lưu dữ liệu: ', error);
    }
}