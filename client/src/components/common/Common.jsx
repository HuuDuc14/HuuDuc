import { Button, InputNumber } from "antd";
import { CheckOutlined } from '@ant-design/icons';
import { useState } from "react";

export const InputQuantityProduct = ({ product, handleUpdateQuantityProduct }) => {
    const [quantity, setQuantity] = useState(product.quantity);

    return (
        <>
            <InputNumber
                size="small"
                value={quantity}
                onChange={(value) => setQuantity(value)}
                style={{ width: "60px" }}
            />
            <Button
                size="small"
                shape="dashed" icon={<CheckOutlined />}
                onClick={() => handleUpdateQuantityProduct(quantity, product._id)}
            >
            </Button>
        </>
    );
};

export const InputPriceProduct = ({ product, handleUpdatePriceProduct }) => {
    const [price, setPrice] = useState(product.finalPrice)

    return (
        <>
            <InputNumber
                size="small"
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                value={price}
                onChange={(value) => setPrice(value)}
            />

            <Button
                size="small"
                shape="dashed" icon={<CheckOutlined />}
                onClick={() => handleUpdatePriceProduct(price, product._id)}
            >
            </Button>
        </>
    )
}