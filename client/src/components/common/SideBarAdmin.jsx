import { FaChartBar } from "react-icons/fa"
import { FiInbox } from "react-icons/fi"
import { IoHeadset, IoSettingsOutline } from "react-icons/io5"
import { NavLink } from "react-router-dom"

const SideBarAdmin = () => {
    return (

        <nav>
            <NavLink to="admin/chart" className={({ isActive }) => isActive ? "button-sidebar active" : "button-sidebar"}>
                <span>
                    <div className="icon">
                        <FaChartBar />
                    </div>
                    <span>Thống kê</span>
                </span>
            </NavLink>
            <NavLink to="/admin/common" className={({ isActive }) => isActive ? "button-sidebar active" : "button-sidebar"}>
                <span>
                    <div className="icon">
                        <IoSettingsOutline />
                    </div>
                    <span>Chung</span>
                </span>
            </NavLink>
            <NavLink to="/admin/product" className={({ isActive }) => isActive ? "button-sidebar active" : "button-sidebar"}>
                <span>
                    <div className="icon">
                        <IoHeadset />
                    </div>
                    <span>Sản phẩm</span>
                </span>
            </NavLink>
            <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "button-sidebar active" : "button-sidebar"}>
                <span>
                    <div className="icon">
                        <FiInbox />
                    </div>
                    <span>Đơn hàng</span>
                </span>
            </NavLink>
        </nav>
    )
}

export default SideBarAdmin