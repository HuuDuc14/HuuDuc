import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, A11y, Autoplay } from 'swiper';
import { displayMoney } from '../../helpers/utils';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import "swiper/scss/effect-coverflow";
import { ProductContext } from '../../contexts/product/productContext';
import { Skeleton } from 'antd';
 

const FeaturedSlider = () => {
    const api_url = 'http://localhost:5000'

    const { products } = useContext(ProductContext)


    if (products.length === 0) {
        return (
            <Swiper
                modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
                loop={true}
                speed={400}
                spaceBetween={100}
                slidesPerView={"auto"}
                pagination={{ clickable: true }}
                effect={"coverflow"}
                centeredSlides={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 70,
                    modifier: 3,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 200
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 250
                    },
                }}
                className="featured_swiper"
            >
                {
                    [0, 1, 2, 3, 4]?.map((index) => {
                        return (
                            <SwiperSlide key={index} className="featured_slides" style={{cursor: "wait"}}>
                                <figure className="featured_img">
                                    <Skeleton.Image active />
                                </figure>
                                <h2 className="products_price">
                                    <Skeleton.Input active style={{ width: 150 }} />
                                </h2>
                            </SwiperSlide>
                        );
                    })
                }
            </Swiper>
        )
    }



    return (
        <Swiper
            modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
            loop={true}
            speed={400}
            spaceBetween={100}
            slidesPerView={"auto"}
            pagination={{ clickable: true }}
            effect={"coverflow"}
            centeredSlides={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 70,
                modifier: 3,
                slideShadows: false,
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 200
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 250
                },
            }}
            className="featured_swiper"
        >
            {
                products?.map((item) => {
                    const { _id, images, title, finalPrice } = item;
                    const newPrice = displayMoney(finalPrice);

                    return (
                        <SwiperSlide key={_id} className="featured_slides">
                            <div className="featured_title">{title}</div>
                            <figure className="featured_img">
                                <Link to={`/product-details/${_id}`}>
                                    <img src={`${api_url}/images/${images[0]}`} alt="" />
                                </Link>
                            </figure>
                            <h2 className="products_price">
                                {newPrice} &nbsp;
                            </h2>
                        </SwiperSlide>
                    );
                })
            }
        </Swiper>
    );
};

export default FeaturedSlider;