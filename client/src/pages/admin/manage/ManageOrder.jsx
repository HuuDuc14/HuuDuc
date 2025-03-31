import React, { useContext, useEffect, useState } from "react";
import SectionsHead from "../../../components/common/SectionsHead";
import useDocTitle from "../../../hooks/useDocTitle";
import { OrderContext } from "../../../contexts/order/orderContext";
import { UserContext } from "../../../contexts/user/userContext";
import EmptyView from "../../../components/common/EmptyView";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { displayMoney } from "../../../helpers/utils";
import { Toast } from "../../../components/alert/toast";
import { Button, Input, Table } from "antd";
import { AddressContext } from "../../../contexts/address/addressContext";
import { SearchOutlined } from '@ant-design/icons';


const ManageOrder = () => {
    useDocTitle("Admin Orders");

    const { getAllOrder, updateStatus } = useContext(OrderContext)
    const { getProvince, getDistrict } = useContext(AddressContext)
    const { userId } = useContext(UserContext)

    const [allOrder, setAllOrder] = useState([])
    const [provinces, setProvinces] = useState([])
    const [currentPage, setCurrentPage] = useState(10)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrder()
                setAllOrder(response)
            } catch (error) {
                console.error("Lỗi khi lấy tất cả đơn hàng: ", error);
            }
        }
        fetchOrders()
    }, [userId])

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await getProvince()
                setProvinces(response)
            } catch (error) {
                console.error("Lỗi khi lấy tỉnh");
            }
        }
        fetchProvinces()
    }, [])


    const handeUpdateStatus = async (orderId, status) => {
        try {
            const response = await updateStatus(orderId, status)
            setAllOrder(prevOrders => {
                return prevOrders.map(order =>
                    order._id === orderId ? { ...order, status } : order
                )
            })
            Toast.fire({
                icon: "success",
                title: `${response.message}`
            })
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: `Hủy đơn hàng không thành công`
            });
        }
    }

    const columns = [
        {
            title: "Ngày đặt",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => (
                <p>
                    {new Date(createdAt).toLocaleString(
                        "vi-VN"
                    )}
                </p>
            ),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: "Người nhận",
            dataIndex: "name",
            key: "name",
            render: (text, customer) => (
                <>
                    <p>Tên khách hàng: {customer.name}</p>
                    <p>SDT: {customer.phone}</p>
                </>
            ),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        placeholder="Tìm tên hoặc SĐT"
                        style={{ marginBottom: 8, display: 'block' }}
                    />

                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{marginRight: "10px"}}
                    >
                        Tìm
                    </Button>
                    <Button
                        onClick={() => clearFilters()}
                        size="small"
                        
                    >
                        Reset
                    </Button>
                </div>
            ),
            filterIcon: filtered => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
            onFilter: (value, customer) => {
                // Kiểm tra nếu tên khách hàng hoặc số điện thoại có chứa giá trị tìm kiếm
                return (
                    customer.name.toLowerCase().includes(value.toLowerCase()) ||
                    customer.phone.includes(value)
                );
            },
            filterSearch: true
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            render: (text, address) => (
                <>
                    <p>{address.address}</p>
                    <p>{address.wardData.name}</p>
                    <p>{address.districtData.name}</p>
                    <p>{address.provinceData.name}</p>
                </>
            ),
            filters: provinces.map(province => ({
                text: province.name,
                value: province.code,
            })),           
            onFilter: (value, order) => order.provinceCode === value,
            filterSearch: true
        },

        {
            title: "Sản phẩm",
            dataIndex: "items",
            key: "items",
            render: (items) => (
                <>
                    {items.map((item) => (
                        <p key={item._id}>
                            <Link to={`/product-details/${item.productId._id}`}>
                                {item.productId.title}
                            </Link>
                        </p>
                    ))}
                </>
            )
        },
        Table.EXPAND_COLUMN,
        {
            title: "Số lượng",
            dataIndex: "items",
            key: "quantity",
            render: (items) => (
                <>
                    {items.map((item) => (
                        <p key={item._id}>
                            {item.quantity}
                        </p>
                    ))}
                </>
            ),
            align: "center"
        },
        {
            title: "Tổng tiền",
            dataIndex: "total",
            key: "total",
            render: (total) => (
                <p>
                    {displayMoney(total)}
                </p>
            ),
            sorter: (a, b) => a.total - b.total,
            align: "center"
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <span className={`status 
                    ${status === "Chờ xác nhận" ? "status_warning" :
                        status === "Đã hủy" ? "status_danger" :
                            status === "Đang giao" ? "status_primary" :
                                status === "Đã nhận" ? "status_success" : ""
                    }`}>
                    {status}
                </span>
            ),
            fixed: "right",
            filters: [
                { text: 'Chờ xác nhận', value: 'Chờ xác nhận' },
                { text: 'Đang giao', value: 'Đang giao' },
                { text: 'Đã giao', value: 'Đã giao' },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, order) => (
                <>
                    {
                        order.status === "Chờ xác nhận" ? (
                            <button className="bt bt_primary" onClick={() => handeUpdateStatus(order._id, "Đang giao")}>Giao hàng</button>
                        ) : order.status === 'Đang giao' ? (
                            <button className="bt bt_success" onClick={() => handeUpdateStatus(order._id, "Đã nhận")}>Đã nhận</button>
                        ) : null
                    }
                </>
            ),
            fixed: "right",
            width: "130px"
        },
    ]

    const onChange = (pagination, filters, sorter) => {     
        setCurrentPage(pagination.pageSize)
    }


    return (
        <>
            <div className="container">
                {allOrder.length === 0 ? (
                    <EmptyView
                        icon={<BsCartX />}
                        msg="Chưa có đơn hàng nào"
                        link="/all-products"
                        btnText="Start Shopping"
                    />
                ) : (
                    <>
                        <SectionsHead heading="Tất cả đơn hàng" />
                        <div className="table-wrapper">

                            <Table
                                columns={columns}
                                dataSource={allOrder}
                                expandable={{
                                    expandedRowRender: (record) => (
                                        <>
                                            {record.items.map((item) => (
                                                <p key={item._id}>
                                                    {item.productId.title} - {item.quantity}
                                                </p>
                                            ))}
                                        </>
                                    )
                                }}
                                scroll={{
                                    x: 'max-content', // Tự động cuộn ngang nếu cần thiết
                                }}
                                pagination={{
                                    pageSize: currentPage,      
                                    showSizeChanger: true,
                                    pageSizeOptions: [10, 20, 50],
                                }}
                                onChange={onChange} 
                            />

                        </div>
                    </>
                )}
            </div>

        </>
    )
}

export default ManageOrder