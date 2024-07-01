import { Stack, Table, Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import { request } from "../../share/request";
import { useEffect, useState } from "react";

const PaymentMethod = () => {
    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [total, setTotal] = useState(0);
    const [payId, setPayId] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [Id, setId] = useState("");

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        try {
            const res = await request("payment_method", "get", {});
            if (res && !res.error) {
                setList(res.list || []);
                setTotal(res.list ? res.list.length : 0);
            } else {
                console.error("Error fetching payment methods:", res.message);
            }
        } catch (error) {
            console.error("Error fetching payment methods:", error);
        }
    };

    const onClickEdit = (item) => {
        setPayId(item.Id);
        setId(item.Id);
        setName(item.name);
        setCode(item.code);
        setDescription(item.description);
        setVisible(true);
    };
    const onChangeId = (event) => setId(event.target.value);
    const onChangeName = (event) => setName(event.target.value);
    const onChangeCode = (event) => setCode(event.target.value);
    const onChangeDes = (event) => setDescription(event.target.value);

    const onDelete = async (Id) => {
        try {
            const res = await request(`payment_method/${Id}`, "delete", {});
            if (res && !res.error) {
                getList();
            } else {
                alert(res.message || "Error deleting payment!");
            }
        } catch (error) {
            console.error("Error deleting payment:", error);
            alert("An error occurred while deleting the payment.");
        }
    };

    const onOpenModal = () => setVisible(true);

    const onCloseModal = () => {
        setVisible(false);
        onClear();
    };

    const onCancel = () => {
        setVisible(false);
        onClear();
    };

    const onClear = () => {
        setPayId("");
        setId("");
        setName("");
        setCode("");
        setDescription("");
    };

    const onSubmit = async () => {
        if(payId== ""){
            var data = {
                Id:Id,
                name : name, 
                code:code,
                description : description
                
            }
            const res = request("payment_method","post",data)
            onCancel()
            if(res){
                getList(); // re call function list 
            }else{
                alert("Error!")
            }
        }else{
            // update
            var data = {
                Id : payId, 
                name : name, 
                code : code,
                description : description
               
            }
            const res = request("payment_method","put",data)
            onCloseModal()
            if(res){
                getList(); // re call function list 
            }else{
                alert("Error!")
            }
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5 }}>
            <div>Total: {total} Payment{total !== 1 ? 's' : ''}</div>
                <Button onClick={onOpenModal}>New Payment</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Id}</td>
                            <td>{item.name}</td>
                            <td>{item.code}</td>
                            <td>{item.description}</td>
                            <td style={{ width: 100 }}>
                                <Stack gap={1} direction="horizontal">
                                    <Button size='small' onClick={() => onClickEdit(item)}>Edit</Button>
                                    <Button size='small' variant="danger" onClick={() => onDelete(item.Id)}>Delete</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={visible} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{(payId === "") ? "New" : "Update"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <FloatingLabel controlId="Id" label="Id" className="mb-3">
                        <Form.Control onChange={onChangeId} value={Id} type="text" placeholder="Id payment" />
                    </FloatingLabel>
                    <FloatingLabel controlId="Name" label="Name" className="mb-3">
                        <Form.Control onChange={onChangeName} value={name} type="text" placeholder="Name" />
                    </FloatingLabel>
                    <FloatingLabel controlId="Code" label="Code" className="mb-3">
                        <Form.Control onChange={onChangeCode} value={code} type="text" placeholder="Code" />
                    </FloatingLabel>
                    <FloatingLabel controlId="Description" label="Description" className="mb-3">
                        <Form.Control onChange={onChangeDes} value={description} type="text" placeholder="Description" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="secondary" onClick={onClear}>Clear</Button>
                    <Button variant="primary" onClick={onSubmit}>{(payId === "") ? "Save" : "Update"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PaymentMethod;