import { Button, Card, Input, Modal, Popconfirm, Table } from "antd";
import { useContext, useState } from "react";
import { CategoryContext } from "../../contexts/common/categoryContext";

const ManageCategory = () => {

    const { categories, createCategory, deleteCategory } = useContext(CategoryContext)
    const [isModalCreateCategory, setIsModalCreateCategory] = useState(false)
    const [categoryName, setCategoryName] = useState("")

    const handleOk = async () => {
        await createCategory(categoryName)
        setCategoryName('')
        setIsModalCreateCategory(false)
    }

    const handleDeleteCategory = async (categoryId) => {
        await deleteCategory(categoryId)
    }
    const columns = [
        {
            title: "Danh mục",
            dataIndex: "name",
            key: "name",
            align: "center"
        },
        {
            title: "",
            key: "action",
            align: "center",
            render: (text, category) => (
                <>
                    <Popconfirm
                        title="Xác nhận"
                        description="Chắc chắn xóa danh mục này ?"
                        onConfirm={() => handleDeleteCategory(category._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <button className="bt bt_danger">Xóa</button>
                    </Popconfirm>
                </>

            ),
        }
    ]

    return (
        <>

            <Modal
                title="Thêm danh mục"
                open={isModalCreateCategory}
                onCancel={() => { setIsModalCreateCategory(false) }}
                onOk={() => handleOk()}
            >
                <Input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
            </Modal>

            <Card
                className="criclebox"
                title="Danh mục sản phẩm"
                extra={
                    <>
                        <Button type="primary" onClick={() => { setIsModalCreateCategory(true) }}>Thêm danh mục</Button>
                    </>
                }
            >
                <Table
                    columns={columns}
                    dataSource={categories}
                    className="ant-border-space"
                    rowKey="_id"
                />
            </Card>
        </>
    )
}

export default ManageCategory;