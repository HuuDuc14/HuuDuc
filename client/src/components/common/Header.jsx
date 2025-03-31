import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import commonContext from '../../contexts/common/commonContext';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';
import { UserContext } from '../../contexts/user/userContext';
import { CartContext } from '../../contexts/cart/cartContext';


const Header = () => {

    const { toggleForm, toggleSearch, isLightMode, toggleLightMode } = useContext(commonContext);
    const { formUserInfo } = useContext(UserContext)
    const { cartQuantity } = useContext(CartContext)
    const [isSticky, setIsSticky] = useState(false);

    // handle the sticky-header
    useEffect(() => {
        const handleIsSticky = () => window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);

        window.addEventListener('scroll', handleIsSticky);

        return () => {
            window.removeEventListener('scroll', handleIsSticky);
        };
    }, [isSticky]);

    useEffect(() => {

    })

    const handleLogout = () => {
        localStorage.removeItem('tokenUser');
        localStorage.removeItem('token');  // Xóa thông tin người dùng trong localStorage
        window.location.href = '/';  // Điều hướng về trang chủ hoặc trang khác
    };




    return (
        <>
            <header id="header" className={isSticky ? 'sticky' : ''}>
                <div className="container">
                    <div className="navbar">
                        <h2 className="nav_logo">
                            <Link to="/">HuuDuc</Link>
                        </h2>
                        <nav className="nav_actions">
                            <div className="search_action">
                                <span onClick={() => toggleSearch(true)}>
                                    <AiOutlineSearch />
                                </span>
                                <div className="tooltip">Tìm kiếm</div>
                            </div>

                            <div className="cart_action">
                                <Link to="/cart">
                                    <AiOutlineShoppingCart />
                                    {
                                        cartQuantity > 0 && (
                                            <span className="badge">{cartQuantity}</span>
                                        )
                                    }
                                </Link>
                                <div className="tooltip">Cart</div>
                            </div>

                            <div className="user_action">
                                <span>
                                    <AiOutlineUser />
                                </span>
                                <div className="dropdown_menu">
                                    <h4>Xin chào! {formUserInfo && <Link to="*">&nbsp;{formUserInfo.name}</Link>}</h4>
                                    <p>Truy cập tài khoản và quản lý đơn hàng.</p>
                                    {
                                        !formUserInfo ? (
                                            <button
                                                type="button"
                                                onClick={() => toggleForm(true)}
                                            >
                                                Đăng nhập / Đăng ký
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => handleLogout()}
                                                >
                                                    Đăng xuất
                                                </button>
                                                <div className="separator"></div>
                                                <ul>
                                                    <li>
                                                        <Link to="/order">Đơn hàng</Link>
                                                    </li>
                                                    {
                                                        formUserInfo.role === 1 ? (
                                                            <>
                                                                <li>
                                                                    <Link to="/admin">Dashboard</Link>
                                                                </li>
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                </ul>
                                            </>
                                        )
                                    }


                                </div>
                            </div>
                            <div className="cart_action">
                                <label
                                    htmlFor="themeToggle"
                                    className="themeToggle st-sunMoonThemeToggleBtn"
                                >
                                    <input
                                        type="checkbox"
                                        id="themeToggle"
                                        className="themeToggleInput"
                                        checked={isLightMode}
                                        onChange={() => toggleLightMode(!isLightMode)}
                                    />
                                    <svg
                                        width="23"
                                        height="23"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        stroke="none"
                                    >
                                        <mask id="moon-mask">
                                            <rect x="0" y="0" width="20" height="20" fill="white"></rect>
                                            <circle cx="11" cy="3" r="8" fill="black"></circle>
                                        </mask>
                                        <circle
                                            className="sunMoon"
                                            cx="10"
                                            cy="10"
                                            r="8"
                                            mask="url(#moon-mask)"
                                        ></circle>
                                        <g>
                                            <circle className="sunRay sunRay1" cx="18" cy="10" r="1.5"></circle>
                                            <circle className="sunRay sunRay2" cx="14" cy="16.928" r="1.5"></circle>
                                            <circle className="sunRay sunRay3" cx="6" cy="16.928" r="1.5"></circle>
                                            <circle className="sunRay sunRay4" cx="2" cy="10" r="1.5"></circle>
                                            <circle className="sunRay sunRay5" cx="6" cy="3.1718" r="1.5"></circle>
                                            <circle className="sunRay sunRay6" cx="14" cy="3.1718" r="1.5"></circle>
                                        </g>
                                    </svg>
                                </label>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <SearchBar />
            <AccountForm />
        </>
    );
};

export default Header;