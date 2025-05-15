import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Toast } from "../../components/alert/toast";
import { message } from "antd";


export const CategoryContext = createContext({})

export const CategoryProvider = ({ children }) => {
    const api_url = process.env.REACT_APP_API_URL_BACKEND
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api_url}/category`)
                setCategories(response.data.categories)
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

    const createCategory = async (categoryName) => {
        try {
            const response = await axios.post(`${api_url}/category/create`, {categoryName})

            const newCategory = response.data.category
            setCategories(prevCategories => [...prevCategories, newCategory])
            message.success(`Đã thêm danh mục ${newCategory.name}`)
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

    const deleteCategory = async (categoryId) => {
        try {
            const response = await axios.get(`${api_url}/category/delete/${categoryId}`)
            const categoryDelete = response.data.category

            setCategories((prevCategories) => 
                prevCategories.filter(category => category._id !== categoryDelete._id)
            )

            message.success(`${response.data.message}`)
        } catch (error) {
            if (error.response && error.response.status == 500) {
                message.error(error.response.data.message)
            } else {
                console.error("Xóa danh mục thành công!", error);
            }
        }
    }

    return <CategoryContext.Provider
        value={{categories, createCategory, deleteCategory}}
    >
        {children}
    </CategoryContext.Provider>
}