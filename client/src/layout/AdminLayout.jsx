import React from "react";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "../components/common/SideBarAdmin";

const AdminLayout = () => {
    return (
        <div className="section">
            <div className="page-admin">
                <aside className="sidebar">
                    <SideBarAdmin />
                </aside>
                <div className="content-admin">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;