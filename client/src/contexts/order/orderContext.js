import axios from "axios";
import { createContext, useContext, useState } from "react";
import { ProductContext } from "../product/productContext";

export const OrderContext = createContext({})

export const OrderProvider = ({children}) => {
    const {updateListProduct} = useContext(ProductContext)
    const api_url = 'http://localhost:5000'

    const fetchOrder = async (userId) => {
        try {
            const reponse = await axios.get(`${api_url}/order/${userId}`)           
            return reponse.data        
        } catch (error) {
            console.error("Lỗi khi lấy đơn mua");
        }
    }
    
    const order = async (userId, orderData) => {
        try {
            const response = await axios.post(`${api_url}/order/${userId}`, orderData)
            await updateListProduct()
            return response.data
        } catch (error) {
            console.error("Lỗi khi đặt hàng", error);
        }
    }

    const updateStatus = async (orderId ,status) => {       
        try {
            const response = await axios.post(`${api_url}/order/updateStatus/${orderId}`, {status})           
            return response.data
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái", error);
        }
    }

    const getAllOrder = async () => {
        try {
            const response = await axios.get(`${api_url}/order/all`)
            return response.data
        } catch (error) {
            console.error("Lỗi khi lấy tất cả đơn hàng", error);
            return []
        }
    }


    return <OrderContext.Provider value={{fetchOrder, order, updateStatus, getAllOrder}}>
        {children}
    </OrderContext.Provider>
}