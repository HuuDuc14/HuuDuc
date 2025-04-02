import React, { useContext, useEffect, useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import useActive from '../../hooks/useActive';
import { CartContext } from '../../contexts/cart/cartContext';
import { UserContext } from '../../contexts/user/userContext';
import { ToastCenter } from '../alert/toast';
import { ProductReviewContext } from '../../contexts/review/productReview';


const ProductCard = (props) => {

    const api_url = 'http://localhost:5000'

    const { _id, images, title, info, finalPrice, quantity } = props;
    const { addToCart } = useContext(CartContext)
    const { userId } = useContext(UserContext)
    const { getReviewOfProduct } = useContext(ProductReviewContext)
    const [countRate, setCountRate] = useState(0)

    const { active, handleActive, activeClass } = useActive(false);

    useEffect(() => {
        const getReview = async () => {
            const rate = await getReviewOfProduct(_id)
            setCountRate(rate.countRate)
        }
        getReview()
    }, [])


    // handling Add-to-cart
    const handleAddItem = (productId) => {

        if (!userId) {
            ToastCenter.fire({
                icon: "info",
                title: `Vui lòng đăng nhập trước khi đặt hàng`
            })
        } else {
            addToCart(userId, productId)

            handleActive(_id);

            setTimeout(() => {
                handleActive(false);
            }, 3000);
        };
    }

    const newPrice = displayMoney(finalPrice);



    return (
        <>
            <div className="card products_card">
                <figure className="products_img">
                    <Link to={`/product-details/${_id}`}>
                        <img src={`${api_url}/images/${images[0]}`} alt="product-img" />
                    </Link>
                </figure>
                <div className="products_details">
                    <span className="rating_star">
                        {[...Array(countRate || 0)].map((_, i) => (
                            <IoMdStar key={i} />
                        ))}
                    </span>
                    <h3 className="products_title">
                        <Link to={`/product-details/${_id}`}>{title}</Link>
                    </h3>
                    <h5 className="products_info">{info}</h5>
                    <div className="separator"></div>
                    <h2 className="products_price">
                        {newPrice} &nbsp;
                    </h2>
                    {
                        quantity > 0 ?
                            (
                                <button
                                    type="button"
                                    className={`btn products_btn ${activeClass(_id)}`}
                                    onClick={() => handleAddItem(_id)}

                                >
                                    {active ? 'Đã thêm' : 'Thêm vào giỏ hàng'}
                                </button>
                            ) :
                            (
                                <button
                                    type="button"
                                    className={`btn products_btn ${activeClass(_id)}`}
                                    // onClick={() => handleAddItem(_id)}
                                    disabled
                                >
                                    
                                    Hết hàng
                                </button>
                            )
                    }

                </div>
            </div>
        </>
    );
};

export default ProductCard;