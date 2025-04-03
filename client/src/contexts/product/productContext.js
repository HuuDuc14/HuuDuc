import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
    const api_url = 'http://localhost:5000'
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api_url}/product`);
                setProducts(response.data);

            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        };

        fetchData();
    }, [])

    const updateListProduct = async () => {
        try {
            const response = await axios.get(`${api_url}/product`);
            setProducts(response.data);
        } catch (error) {
            console.error("Lấy danh sách sản phẩm không thành công!", error);
        }
    }


    const getProductDetail = async (id) => {
        try {
            const response = await axios.get(`${api_url}/product/product-details/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching product detail:", error);
            return null;
        }
    };

    const addProduct = async (formData) => {
        try {
            const response = await axios.post(`${api_url}/product/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const newProduct = response.data.product
            setProducts(prevProducts => [...prevProducts, newProduct])
            return response.data

        } catch (error) {
            console.error('Error adding product:', error);

        }
    }

    const deleteProduct = async (id) => {
        try {
            const response = await axios.post(`${api_url}/product/delete/${id}`)
            const deleteProduct = response.data.product
            setProducts((prevProducts) =>
                prevProducts.filter(product => product._id !== deleteProduct._id))

            return response.data.message
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    }


    return <ProductContext.Provider value={{ products, getProductDetail, addProduct, deleteProduct, updateListProduct }}>
        {children}
    </ProductContext.Provider >
}