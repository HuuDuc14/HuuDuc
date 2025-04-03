import { Skeleton } from 'antd';
import React, { useContext } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/product/productContext';
import ProductCard from './ProductCard';


const TopProducts = () => {

    const { products } = useContext(ProductContext)


    if (products.length === 0) {
        return (
            <div className="wrapper products_wrapper" style={{cursor: "wait"}}>
                {
                    [0, 1, 2].map((index) => (
                        <div className="card products_card" key={index}>
                            <figure className="products_img">
                                <Skeleton.Image active />
                            </figure>
                            <div className="products_details">
                                <span className="rating_star">
                                    <Skeleton.Button active style={{ width: 80, height: 20, marginRight: 5 }} />
                                </span>
                                <h3 className="products_title">
                                    <Skeleton.Input active style={{ width: 150 }} />
                                </h3>
                                <h5 className="products_info">
                                    <Skeleton.Input active style={{ width: 200 }} />
                                </h5>
                                <div className="separator"></div>
                                <h2 className="products_price">
                                    <Skeleton.Input active style={{ width: 100 }} />
                                </h2>
                                <Skeleton.Button active style={{ width: '100%', height: 40, marginTop: '10px' }} />
                            </div>
                        </div>
                    ))
                }
                <div className="card products_card browse_card">
                    <Link to="/all-products">
                        Tất cả <br /> sản phẩm <BsArrowRight />
                    </Link>
                </div>
            </div>

        )
    }



    return (
        <>
            <div className="wrapper products_wrapper">
                {
                    products?.filter(item => item.rateCount === 5).map(item => (
                        <ProductCard
                            key={item._id}
                            {...item}
                        />
                    ))
                }
                <div className="card products_card browse_card">
                    <Link to="/all-products">
                        Tất cả <br /> sản phẩm <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopProducts;