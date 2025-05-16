import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Toast } from "../../components/alert/toast";
import { message } from "antd";

export const BrandContext = createContext({})

export const BrandProvider = ({ children }) => {
    const api_url = process.env.REACT_APP_API_URL_BACKEND
    const [brands, setBrands] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api_url}/brand`)
                setBrands(response.data.brands)
            } catch (error) {
                if (error.response && error.response.status == 500) {
                    Toast.fire({
                        icon: "error", 
                        title: `${error.response.data.message}`
                    })
                } else {
                    console.error("Lấy thương hiệu không thành công!", error);
                }
            }
        }

        fetchData()
    }, [])

    const createBrand = async (nameBrand) => {
        try {
            const response = await axios.post(`${api_url}/brand/create`, {nameBrand})
            const newBrand = response.data.brand
            setBrands(prevBrands => [...prevBrands, newBrand])
            message.success(`Đã thêm ${newBrand.name}`)
            return response.data
        } catch (error) {
            if (error.response && error.response.status == 500) {
                Toast.fire({
                    icon: "error",
                    title: `${error.response.data.message}`
                })
            } else {
                console.error("Tạo thương hiệu không thành công!", error);
            }
        }
    }

    const deleteBrand = async (brandId) => {
        try {
            const response = await axios.post(`${api_url}/brand/delete/${brandId}`)
            const brandDelete = response.data.brand

            setBrands((prevBrands) =>
                prevBrands.filter(brand => brand._id !== brandDelete._id)
            )
            message.success(`${response.data.message}`)
        } catch (error) {
            if (error.response && error.response.status == 500) {
                message.error(error.response.data.message)
            } else {
                console.error("Tạo thương hiệu không thành công!", error);
            }
        }
    }


    return <BrandContext.Provider
        value={{
            brands,
            createBrand,
            deleteBrand
        }}
    >
        {children}
    </BrandContext.Provider>

}