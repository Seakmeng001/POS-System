import { useEffect, useState, useRef } from "react";
import {
  Button,
  Table,
  Space,
  Tag,
  Input,
  Modal,
  Form,
  Select,
  Spin,
  message,
  Popconfirm,
  Row,
  Col,
  Divider,
  Image,
} from "antd";
import { IoMdCloseCircle } from "react-icons/io";
import { formatDateClient, formatDateServer, config } from "../../share/helper";
import styles from "./styles.module.css";
import { request } from "../../share/request";
import bcrypt from 'bcryptjs'; // or 'bcrypt' depending on your setup



const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const EmployeePage = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const [textSearch, setTextSearch] = useState("");
  const [imagPre, setImagePre] = useState(null);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    var param = " ";
    if (textSearch !== " ") {
      param = "?textSearch=" + textSearch;
    }
    const res = await request("employee" + param, "get");
    setLoading(false);
    if (res) {
      setList(res.list);
      setTotal(res.total[0].Total);
    } else {
      // Handle error case
    }
  };

  const onNewEmployee = () => {
    setVisible(true);
  };

  const onCloseModal = () => {
    setVisible(false);
    onClearForm();
    setId(null);
  };

  const onDelete = async (rows) => {
    var param = {
      id: rows.id,
      image: rows.image,
    };
    const res = await request("employee", "delete", param);
    if (!res.error) {
      getList();
    } else {
      alert(res.message); // Consider using message.error from antd or similar
    }
  };

  const onFinish = async (values) => {
    try {
      const hashedPassword = await bcrypt.hash(values.password, 10); // Hash password here

      var formData = new FormData();
      formData.append("firstname", values.firstname);
      formData.append("lastname", values.lastname);
      formData.append("gender", values.gender);
      formData.append("dob", values.dob);
      formData.append("email", values.email);
      formData.append("tel", values.tel);
      formData.append("role", values.role);
      formData.append("address", values.address);
      formData.append("image", form.getFieldValue("image"));
      
      if (image !== null) {
        formData.append("image_emp", image, image.filename);
      }

      var method = "post";
      if (id !== null) {
        formData.append("id", id);
        method = "put";
      }

      const res = await request("employee", method, formData);
      if (!res.error) {
        message.success(res.message);
        getList();
        form.resetFields();
        onCloseModal();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error during password hashing:", error);
      message.error("Failed to hash password");
    }
  };

  const onClearForm = () => {
    form.resetFields();
    setImagePre(null);
    setImage(null);
    refMyImage.current.value = null;
  };

  const onClickEdit = (item) => {
    setId(item.id);
    form.setFieldsValue({
      firstname: item.firstname,
      lastname: item.lastname,
      gender: item.gender + "",
      dob: formatDateServer(item.dob),
      email: item.email,
      tel: item.tel,
      address: item.address,
      role: item.role,
      image: item.image,
    });
    setImagePre(config.image_path + item.image);
    setVisible(true);
  };

  const onSearch = () => {
    getList();
  };

  const onChangeTextSearch = (e) => {
    setTextSearch(e.target.value);
  };

  const onChangeFile = (e) => {
    var file = e.target.files[0];
    setImage(file);
    setImagePre(URL.createObjectURL(file));
  };

  const refMyImage = useRef();

  const onRemoveImageUpdate = (e) => {
    e.preventDefault();
    setImagePre(null);
    setImage(null);
    form.setFieldsValue({
      image: null,
    });
  };

  return (
    <div>
      <Spin spinning={loading}>
        <div className={styles.headerContainer}>
          <div className={styles.containFilter}>
            <div>
              <div className={styles.txtHeader}> Employee </div>
              <div>total: {total} employee</div>
            </div>

            <Input.Search
              allowClear
              onSearch={onSearch}
              onChange={onChangeTextSearch}
            />
          </div>
          <Button onClick={onNewEmployee}>New Employee</Button>
        </div>
        <Table
          dataSource={list}
          columns={[
            {
              key: "No",
              title: "No",
              render: (value, items, index) => index + 1,
            },
            {
              key: "FirstName",
              title: "Firstname",
              dataIndex: "firstname",
            },
            {
              key: "LastName",
              title: "Lastname",
              dataIndex: "lastname",
            },
            {
              key: "Gender",
              title: "Gender",
              dataIndex: "gender",
              render: (value) => (value == 1 ? "Male" : "Female"),
            },
            {
              key: "Dob",
              title: "Dob",
              dataIndex: "dob",
              render: (value) => formatDateClient(value),
            },
            {
              key: "Email",
              title: "Email",
              dataIndex: "email",
            },
            {
              key: "Tel",
              title: "Tel",
              dataIndex: "tel",
            },
            {
              key: "Image",
              title: "Image",
              dataIndex: "image",
              render: (value, rows) => (
                <div>
                  {value != null && value !== " " ? (
                    <Image src={config.image_path + value} width={100} />
                  ) : (
                    <div style={{ height: 100, width: 100, backgroundColor: "#eee" }} />
                  )}
                </div>
              ),
            },
            {
              key: "Address",
              title: "Address",
              dataIndex: "address",
            },
            {
              key: "Role",
              title: "Role",
              dataIndex: "role",
              render: (value) => <Tag>{value}</Tag>,
            },
            {
              key: "Creation",
              title: "Creation",
              dataIndex: "create_at",
              render: (value) => formatDateClient(value),
            },
            {
              key: "Action",
              title: "Action",
              render: (value, item) => (
                <Space>
                  <Button danger onClick={() => onClickEdit(item)}>
                    Edit
                  </Button>
                  <Popconfirm
                    title="Are you sure delete this employee?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => onDelete(item)}
                  >
                    <Button type="primary">Delete</Button>
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
        />
        <Modal
          visible={visible}
          title={id == null ? "New Employee" : "Update Employee"}
          onCancel={onCloseModal}
          footer={null}
          maskClosable={false}
          width={700}
        >
          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
            <Divider />
            <Row gutter={5}>
              <Col span={12}>
                <Form.Item
                  name="firstname"
                  label="Firstname"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastname"
                  label="Lastname"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Please select gender">
                    <Option value={"1"}>Male</Option>
                    <Option value={"2"}>Female</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dob"
                  label="Dob"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col span={12}>
                <Form.Item
                  name="tel"
                  label="Tel"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="email" label="Email">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col span={12}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col span={24}>
                <Form.Item label="Select picture">
                  <input type="file" ref={refMyImage} onChange={onChangeFile} />
                  <div>
                    <img src={imagPre} width={100} style={{ marginTop: 10 }} />
                    {id != null && imagPre != null && (
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
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button htmlType="button" onClick={onCloseModal}>
                  Cancel
                </Button>
                <Button htmlType="button" onClick={onClearForm}>
                  Clear
                </Button>
                <Button htmlType="submit" type="primary">
                  {id == null ? "Save" : "Update"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Spin>
    </div>
  );
};

export default EmployeePage;
