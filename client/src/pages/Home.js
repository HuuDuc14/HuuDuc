import React, { useEffect } from 'react';
import HeroSlider from '../components/sliders/HeroSlider';
import FeaturedSlider from '../components/sliders/FeaturedSlider';
import SectionsHead from '../components/common/SectionsHead';
import TopProducts from '../components/product/TopProducts';
import { Toast } from '../components/alert/toast';


const Home = () => {

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        const verifyEmail = queryParams.get('verifyEmail')

        if (verifyEmail && verifyEmail === 'success') {
            Toast.fire({
                icon: "success",
                title: `Đăng ký thành công. Hãy đăng nhập`
            })
        } else if (verifyEmail && verifyEmail === 'error') {
            Toast.fire({
                icon: "error",
                title: `Lỗi khi xác thực tài khoản`
            })
        }
    }, [])

    return (
        <main>
            <section id="hero">
                <HeroSlider />
            </section> 

            <section id="featured" className="section">
                <div className="container">
                    <SectionsHead heading="Sản phẩm nổi bật" />
                    <FeaturedSlider />
                </div>
            </section>

            <section id="products" className="section">
                <div className="container">
                    <SectionsHead heading="Sản phẩm hàng đầu" />
                    <TopProducts />
                </div>
            </section>
        </main>
    );
};

export default Home;;