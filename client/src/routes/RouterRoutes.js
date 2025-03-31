import React from 'react';
import { Routes, Route } from 'react-router';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import DetailProduct from '../pages/DetailProduct';
import Order from '../pages/Oder';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminRoute from './AdminRoute';
import ManageProducts from '../pages/admin/manage/ManageProduct';
import ManageOrder from '../pages/admin/manage/ManageOrder';
import AdminLayout from '../layout/AdminLayout';

const RouterRoutes = () => {

    // useScrollRestore();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/product-details/:productId" element={<DetailProduct />} />
                <Route path="/order" element={<Order />} />
                <Route path="*" element={<ErrorPage />} />

                <Route element={<AdminRoute />}>
                    <Route path='/admin' element={<AdminLayout />}>
                        <Route path="" element={<AdminDashboard />} />
                        <Route path="product" element={<ManageProducts />} />
                        <Route path="orders" element={<ManageOrder />} />
                    </Route>

                </Route>
            </Routes>
        </>
    );
};

export default RouterRoutes;