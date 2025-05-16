import { Button, Card, Input, Modal, Table } from "antd";
import { useContext, useState } from "react";
import { BrandContext } from "../../contexts/common/brandContext";
import Swal from "sweetalert2";

const ManageBrand = () => {
    const { brands, createBrand, deleteBrand } = useContext(BrandContext);  // Lấy brands từ context
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [brandName, setBrandName] = useState("");


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        await createBrand(brandName)
        setBrandName('')
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDelete = (brand) => {
        Swal.fire({
            text: `Bạn có chắc chắn xóa ${brand.name}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF0000",
            cancelButtonColor: "#454a4d",
            background: "#F0F0F0",
            color: "#484848",
            confirmButtonText: "Xóa"
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteBrand(brand._id)
            }
        });
    }

    const columns = [
        {
            title: "Thương hiệu",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Số lượng sản phẩm",
            key: "productCount",
            align: "center",
            render: (brand) => (
                <>
                    {brand?.productCount}
                </>
            ),
        },
        {
            title: "",
            key: "action",
            align: "center",
            render: (text, brand) => (
                <>
                    <button className="bt bt_danger" onClick={() => handleDelete(brand)}>Xóa</button>
                </>
            ),
        },
    ];


    return (
        <>
            <Modal
                title="Nhập tên thương hiệu"
                open={isModalOpen}
                onOk={() => handleOk()}
                onCancel={handleCancel}
            >
                <Input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
            </Modal>
            <Card
                className="criclebox"
                title="Thương hiệu"
                extra={
                    <>
                        <Button
                            type="primary"
                            onClick={() => showModal()}>Thêm thương hiệu</Button>
                    </>
                }
            >
                <Table
                    columns={columns}
                    dataSource={brands}
                    className="ant-border-space"
                    rowKey="_id"
                />
            </Card>
        </>
    )
}

export default ManageBrand