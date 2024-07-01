import React, { useEffect, useState, useRef } from "react";
import { Button, Space, Spin, Table, Input, Row, Col, Modal, Form, Divider, message, Select, InputNumber, Image, Popconfirm } from "antd";
import { IoIosCloseCircle, IoMdCloseCircle } from "react-icons/io";
import { request } from "../../share/request";
import { formatDateClient, config } from "../../share/helper";
import styles from "./styles.module.css";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const pageSize = 3;

const Product = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [image, setImage] = useState(null);
    const [totalRecord, setTotalRecord] = useState(0);
    const [imagePre, setImagePre] = useState(null);
    const [id, setId] = useState(null);
    
    const [textSearch, setTextSearch] = useState("");
    const [objFilter, setObjFilter] = useState({
        page: 1,
        txtSearch: ""
    });

    useEffect(() => {
        getList(objFilter);
        getListCategory();
    }, [objFilter.page]);

    const getListCategory = async () => {
        setLoading(true);
        let param = "";
        if (textSearch !== "") {
            param = `?textSearch=${encodeURIComponent(textSearch)}`;
        }
        const resCat = await request(`category${param}`, "get");
        if (resCat && resCat.list) {
            setListCategory(resCat.list);
        }
        setLoading(false);
    };

    const getList = async (paramObjFilter) => {
        setLoading(true);
        const { page, txtSearch } = paramObjFilter;
        let param = `?page=${page}`;
        if (txtSearch) {
            param += `&txtSearch=${encodeURIComponent(txtSearch)}`;
        }
        const res = await request(`product${param}`, "get");
        setLoading(false);
        if (res && res.list) {
            setList(res.list);
            if (page === 1) {
                setTotalRecord(res.total);
            }
        }
    };

    const onSearch = () => {
        const newObjFilter = {
            ...objFilter,
            page: 1,
            txtSearch: textSearch,
        };
        setObjFilter(newObjFilter);
        getList(newObjFilter);
    };

    const onChangeTextSearch = (e) => {
        setTextSearch(e.target.value);
    };

    const onProductClick = () => {
        form.resetFields();
        setImagePre(null);
        setImage(null);
        refMyImage.current.value = null;
        setId(null);
        setVisibleModal(true);
    };

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            formData.append("id", values.id);
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("status", values.status);
            formData.append("categoryId", values.categoryId);
            formData.append("description", values.description);
            formData.append("image", form.getFieldValue("image"));
      
            if (image !=null) {
                formData.append("image_pro", image,image.filename);
            }
            
            var method = "post";
            if (id !=null) {
                formData.append("id", id);
                method = "put";
            }

            const res = await request("product", method, formData);
            if (!res.error) {
                message.success(res.message);
                getList(objFilter);
                onCloseModal();
            } else {
                message.error(res.message);
            }
        } catch (error) {
            console.error("Failed to save product:", error);
            message.error("Failed to save product.");
        }
    };

    const onCloseModal = () => {
        setVisibleModal(false);
        form.resetFields();
        setImage(null);
        setImagePre(null);
        refMyImage.current.value = null;
    };

    const onChangeFile = (e) => {
        var file = e.target.files[0];
        setImage(file);
        setImagePre(URL.createObjectURL(file));
    };
    const refMyImage = useRef();

    const onChangePage = (page) => {
        setObjFilter(prev => ({ ...prev, page }));
    };

    const onDelete = async (item) => {
        try {
            const res = await request(`product/${item.id}`, "delete");
            if (!res.error) {
                message.success("Product deleted successfully!");
                getList(objFilter);
            } else {
                message.error(res.message);
            }
        } catch (error) {
            console.error("Failed to delete product:", error);
            message.error("Failed to delete product.");
        }
    };

    const onClickEdit = (item) => {
        setId(item.id);
        form.setFieldsValue({
            categoryId: item.categoryId,
            name: item.name,
            id:item.id,
            description: item.description,
            price: item.price,
            status: item.status,
            image: item.image,
        });
        setImagePre(config.image_path + item.image);
        setVisibleModal(true);
    };

    const onRemoveImageUpdate = (e) => {
        e.preventDefault();
        setImagePre(null);
        setImage(null);
        
        form.setFieldsValue({ image: null });
       
    };

    return (
        <Spin spinning={loading}>
            <div className={styles.headerContainer}>
                <div className={styles.containFilter}>
                    <div>
                        <div className="textPageTitle">Product</div>
                        <div>Total: {totalRecord} Items</div>
                    </div>

                    <Input.Search
                        allowClear
                        onSearch={onSearch}
                        onChange={onChangeTextSearch}
                    />
                </div>
                <Button onClick={onProductClick}>New product</Button>
            </div>

            <Table
                pagination={{
                    total: totalRecord,
                    pageSize: pageSize,
                    onChange: onChangePage
                }}
                dataSource={list}
                columns={[
                    {
                        title: "No",
                        render: (value, items, index) => (objFilter.page - 1) * pageSize + index + 1,
                    },
                    {
                        title: "Category Id",
                        dataIndex: "categoryId",
                        key: "categoryId",
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                    },
                    {
                        title: "Code",
                        dataIndex: "id",
                        key: "id",
                    },
                    {
                        title: "Description",
                        dataIndex: "description",
                        key: "description",
                    },
                    {
                        title: "Price ($)",
                        dataIndex: "price",
                        key: "price",
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        render: (value) => (value === 1 ? "Active" : "Disabled"),
                    },
                    {
                        title: "Image",
                        dataIndex: "image",
                        key: "image",
                        render: (value) => (
                            <div>
                                {value ? (
                                    <Image
                                        width={100} 
                                        src={config.image_path + value}
                                    />
                                ) : (
                                    <div style={{ height: 100, width: 100, backgroundColor: '#eee' }} />
                                )}
                            </div>
                        ),
                    },
                    {
                        title: "Create_at",
                        dataIndex: "create_at",
                        key: "create_at",
                        render: (value) => formatDateClient(value),
                    },
                    {
                        title: "Action",
                        key: "action",
                        align: "center",
                        width: 150,
                        render: (text, record) => (
                            <Space size="middle">
                                <Button type="primary" onClick={() => onClickEdit(record)}>Edit</Button>
                                <Popconfirm
                                    title="Are you sure delete this product?"
                                    onConfirm={() => onDelete(record)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>
                            </Space>
                        ),
                    },
                ]}
            />

            <Modal
                title={id ? "Update Product" : "New Product"}
                visible={visibleModal}
                onCancel={onCloseModal}
                footer={null}
                maskClosable={false}
                width={800}
            >
                <Divider />
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item
                            
                                label="Product Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input product name!' }]}
                            >
                                <Input placeholder="Product name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Category"
                                name="categoryId"
                                rules={[{ required: true, message: 'Please select category!' }]}
                            >
                                <Select placeholder="Select category">
                                    {listCategory.map((item,index) => (
                                        <Select.Option key={index} value={item.id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row gutter={5}>
                    <Col span={12}>
                            <Form.Item
                                label="Code"
                                name="id"
                                rules={[{ required: true, message: 'Please input Id product!' }]}
                            >
                                <Input style={{ width: '100%' }} placeholder="Id product" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input description!' }]}
                            >
                                <Input.TextArea rows={4} placeholder="Description" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input price!' }]}
                            >
                                <InputNumber style={{ width: '100%' }} placeholder="Price" />
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item
                                label="Status"
                                name="status"
                                rules={[{ required: true, message: 'Please select status!' }]}
                            >
                                <Select placeholder="Select status">
                                    <Select.Option value={1}>Active</Select.Option>
                                    <Select.Option value={0}>Disabled</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                        
                        <Form.Item label="Select picture">
                  <input type="file" ref={refMyImage} onChange={onChangeFile} />
                  <div>
                    <img src={imagePre} width={100} style={{ marginTop: 10 }} />
                    {id != null && imagePre != null && (
                      <div>
                        <button onClick={onRemoveImageUpdate}>
                          <IoMdCloseCircle size={22} color="red" />
                        </button>
                      </div>
                    )}
                  </div>
                </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
                        <Space>
                            <Button onClick={onCloseModal}>Cancel</Button>
                            <Button type="primary" htmlType="submit">{id ? "Update" : "Save"}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </Spin>
    );
};

export default Product;
