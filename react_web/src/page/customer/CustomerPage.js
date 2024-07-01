import { Stack, Table, Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import { request } from "../../share/request";
import { formatDateClient, formatDateServer, config } from "../../share/helper";
import { useEffect, useState } from "react";

const CustomerPage = () => {
    useEffect(() => {
        getList();
    }, []);

    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [customerId, setCustomerId] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");

    const getList = async () => {
        const res = await request("customer", "get", {});

        if (res) {
            setList(res.customer_list);
        }
    };

    const onClickEdit = (item) => {
        setVisible(true);
        setCustomerId(item.customer_id);
        setFirstname(item.firstname);
        setLastname(item.lastname);
        setGender(item.gender);
        setDob(formatDateClient(item.dob)); // Format date for client
        setTel(item.tel);
        setEmail(item.email);
    };

    const onDelete = async (id) => {
        const res = await request("customer/" + id, "delete");
        if (res) {
            getList();
        }
    };

    const onOpenModal = () => {
        setVisible(true);
    };

    const onCancel = () => {
        setVisible(false);
        onClear();
    };

    const onClear = () => {
        setCustomerId("");
        setFirstname("");
        setLastname("");
        setGender("");
        setEmail("");
        setTel("");
        setDob("");
    };

    const onSubmit = async () => {
        const formattedDob = formatDateServer(dob); // Format date for server

        if (customerId === "") {
            // Save
            const param = {
                firstname: firstname,
                lastname: lastname,
                gender: gender,
                dob: formattedDob,
                tel: tel,
                email: email,
            };
            const res = await request("customer", "post", param);
            onClear();
            setVisible(false);
            if (res) {
                if (!res.error) {
                    getList();
                } else {
                    alert(res.message);
                }
            }
        } else {
            // Update
            const param = {
                customer_id: customerId,
                firstname: firstname,
                lastname: lastname,
                gender: gender,
                dob: formattedDob,
                tel: tel,
                email: email,
            };
            const res = await request("customer", "put", param);
            onClear();
            setVisible(false);
            if (res) {
                if (!res.error) {
                    getList();
                } else {
                    alert(res.message);
                }
            }
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5 }}>
                <div>Customer</div>
                <Button onClick={onOpenModal}>New Customer</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Tel</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.gender == 1 ? "Male" : "Female"}</td>
                            <td>{formatDateClient(item.dob)}</td> {/* Format date for display */}
                            <td>{item.email}</td>
                            <td>{item.status == 1 ? "Active" : "Disabled"}</td>
                            <td>{item.tel}</td>
                            <td style={{ width: 100 }}>
                                <Stack gap={1} direction="horizontal">
                                    <Button size='small' onClick={() => onClickEdit(item)}>Edit</Button>{' '}
                                    <Button size='small' variant="danger" onClick={() => onDelete(item.customer_id)}>Delete</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={visible}>
                <Modal.Header>
                    <Modal.Title>{(customerId === "") ? "New" : "Update"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="firstname"
                        label="Firstname"
                        className="mb-3"
                    >
                        <Form.Control
                            onChange={(event) => setFirstname(event.target.value)}
                            value={firstname}
                            type="text"
                            placeholder="firstname"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="lastname"
                        label="Lastname"
                        className="mb-3"
                    >
                        <Form.Control
                            onChange={(event) => setLastname(event.target.value)}
                            value={lastname}
                            type="text"
                            placeholder="lastname"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="gender"
                        label="Gender"
                        className="mb-3"
                    >
                        <Form.Control
                            onChange={(event) => setGender(event.target.value)}
                            value={gender}
                            type="text"
                            placeholder="Gender"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="dob"
                        label="Dob"
                        className="mb-3"
                    >
                        <Form.Control
                            onChange={(event) => setDob(event.target.value)}
                            value={dob}
                            type="text"
                            placeholder="Date of birth"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="email"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            type="text"
                            placeholder="email"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="tel"
                        label="Tel"
                        className="mb-3"
                    >
                        <Form.Control
                            onChange={(event) => setTel(event.target.value)}
                            value={tel}
                            type="text"
                            placeholder="tel"
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="secondary" onClick={onClear}>Clear</Button>
                    <Button variant="primary" onClick={onSubmit}>{(customerId === "") ? "Save" : "Update"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CustomerPage;
