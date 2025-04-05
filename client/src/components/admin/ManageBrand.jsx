import { Button, Card, Input, Modal, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { BrandContext } from "../../contexts/common/brandContext";

const ManageBrand = () => {
    const { brands, createBrand } = useContext(BrandContext);  // Lấy brands từ context
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

    const columns = [
        {
            title: "Thương hiệu",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Hành động",
            key: "action",
            align: "center",
            render: (text, brand) => (
                <>
                    <button className="bt bt_danger">Xóa</button>
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