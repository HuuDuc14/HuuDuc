import { useContext, useEffect, useState } from "react";
import SectionsHead from "../../../components/common/SectionsHead";
import useDocTitle from "../../../hooks/useDocTitle";
import { ProductContext } from "../../../contexts/product/productContext";
import commonContext from "../../../contexts/common/commonContext";
import FormProduct from "../../../components/form/FormProduct";
import { Toast } from "../../../components/alert/toast";
import Swal from "sweetalert2";
import { Table } from 'antd';

import { InputPriceProduct, InputQuantityProduct } from "../../../components/common/Common";


const ManageProducts = () => {
    useDocTitle("Quản lý sản phẩm");

    const api_url = 'http://localhost:5000'
    const { products, deleteProduct, updateQuantityProduct, updatePriceProduct } = useContext(ProductContext)
    const { toggleFormCreate } = useContext(commonContext);
    const [allProduct, setAllProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(10)

    useEffect(() => {
        const getProducts = async () => {
            try {
                setAllProducts(products)
            } catch (error) {
                console.log("Lỗi khi lấy sản phẩm: ", error);

            }
        }
        getProducts()
    }, [products])

    if (allProduct == null) {
        return (
            <>
                ...loading
            </>
        )
    }

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                text: "Bạn có chắc chắn xóa sản phẩm này không!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#FF0000",
                cancelButtonColor: "#454a4d",
                background: "#F0F0F0",
                color: "#484848",
                confirmButtonText: "Xóa"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await deleteProduct(id)
                    Toast.fire({
                        icon: "success",
                        title: `${response}`
                    });
                }
            });

        } catch (error) {
            Toast.fire({
                icon: "error",
                title: `Không xóa được sản phẩm`
            });
        }
    }

    const handleUpdateQuantityProduct = (quantity, productId) => {
        updateQuantityProduct(quantity, productId)
    }

    const handleUpdatePriceProduct = (price, producId) => {
        updatePriceProduct(price, producId)
    }


    const columns = [
        {
            title: "Hình ảnh",
            dataIndex: 'images',
            key: 'image',
            width: '150px',
            render: (images) => {
                if (images) {
                    return <img src={`${api_url}/images/${images[0]}`} alt="product-img" width="100%" />
                }
                return null
            }
        },
        {
            title: "Hãng",
            dataIndex: 'brand',
            key: 'brand',
            filters: [
                { text: 'JBL', value: 'JBL' },
                { text: 'boAt', value: 'boAt' },
            ],
            onFilter: (value, record) => record.brand.indexOf(value) === 0
        },
        {
            title: "Tên",
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            sorter: {
                compare: (a, b) => a.title.localeCompare(b.title),
                multiple: 1,
            },
        },
        {
            title: "Loại",
            dataIndex: 'type',
            key: 'type',
            filters: [
                { text: 'On Ear', value: 'On Ear' },
                { text: 'In Ear', value: 'In Ear' },
                { text: 'Over Ear', value: 'Over Ear' },
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0
        },
        {
            title: "Số lượng",
            key: 'quantity',
            render: (product) => (
                <>
                    <InputQuantityProduct
                        key={product._id}
                        product={product}
                        handleUpdateQuantityProduct={handleUpdateQuantityProduct} // Truyền hàm cập nhật số lượng vào component con
                    />
                </>
            ),
            sorter: {
                compare: (a, b) => a.quantity - b.quantity,
                multiple: 2,
            },
            align: 'center'
        },
        {
            title: "Giá",
            key: 'finalPrice',
            sorter: {
                compare: (a, b) => a.quantity - b.quantity,
                multiple: 4,
            },
            render: (product) => (
                <>
                    <InputPriceProduct
                        key={product._id}
                        product={product}
                        handleUpdatePriceProduct={handleUpdatePriceProduct}
                    />
                </>
            ),
            align: 'center'
        },
        {
            title: "Hành động",
            key: 'action',
            render: (text, product) => (
                <button key={product._id} className="bt bt_danger" onClick={() => handleDelete(product._id)}>Xóa</button>
            ),
            fixed: 'right',
            width: '70px'
        },
    ]

    const onChange = (pagination, filters, sorter) => {
        setCurrentPage(pagination.pageSize)
    }

    return (
        <>
            <div className="container">
                <SectionsHead heading="Quản lý sản phẩm" />
                <div>
                    <button className="btn" onClick={() => toggleFormCreate(true)}>Thêm sản phẩm</button>
                </div>
                <div className="table-wrapper">
                    <Table
                        rowKey="_id"
                        columns={columns}
                        dataSource={allProduct}
                        onChange={onChange}
                        pagination={{
                            pageSize: currentPage,
                            showSizeChanger: true,
                            pageSizeOptions: [10, 20, 50],
                        }}
                        scroll={{
                            x: 'max-content', // Tự động cuộn ngang nếu cần thiết
                        }} />
                </div>
            </div>

            <FormProduct />

        </>
    )
}

export default ManageProducts