import { Stack, Table, Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import { request } from "../../share/request";
import { useEffect, useState } from "react";

const  ShiftPage= () => {
    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [total, setTotal] = useState(0);
    const [payId, setPayId] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
   
    const [description, setDescription] = useState("");
   

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        try {
            const res = await request("shift", "get", {});
            if (res && !res.error) {
                setList(res.list || []);
                setTotal(res.list ? res.list.length : 0);
            } else {
                console.error("Error fetching shift:", res.message);
            }
        } catch (error) {
            console.error("Error fetching shift:", error);
        }
    };

    const onClickEdit = (item) => {
        setPayId(item.id); 
        setId(item.id);
        setName(item.name);
        setDescription(item.description);
        setVisible(true);
    };
    const onChangeId = (event) => setId(event.target.value);
    const onChangeName = (event) => setName(event.target.value);
    const onChangeDes = (event) => setDescription(event.target.value);

    const onDelete = async (id) => {
        try {
            const res = await request(`shift/${id}`, "delete", {});
            if (res && !res.error) {
                getList();
            } else {
                alert(res.message || "Error deleting role!");
            }
        } catch (error) {
            console.error("Error deleting shift:", error);
            alert("An error occurred while deleting shift.");
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
        setDescription("");
    };

    const onSubmit = async () => {
        if(payId == ""){
            var data = {
                id:id,
                name : name, 
                description : description
                
            }
            const res = request("shift","post",data)
            onCancel()
            if(res){
                getList(); // re call function list 
            }else{
                alert("Error!")
            }
        }else{
            // update
            var data = {
                id   : payId, 
                name : name, 
                description : description
               
            }
            const res = request("shift","put",data)
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
            <div>Total: {total} Shift{total !== 1 ? 's' : ''}</div>
                <Button onClick={onOpenModal}>New Shift</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                           
                            <td>{item.description}</td>
                            <td style={{ width: 100 }}>
                                <Stack gap={1} direction="horizontal">
                                    <Button size='small' onClick={() => onClickEdit(item)}>Edit</Button>
                                    <Button size='small' variant="danger" onClick={() => onDelete(item.id)}>Delete</Button>
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
                        <Form.Control onChange={onChangeId} value={id} type="text" placeholder="Id Shift" />
                    </FloatingLabel>
                    <FloatingLabel controlId="Name" label="Name" className="mb-3">
                        <Form.Control onChange={onChangeName} value={name} type="text" placeholder="Name" />
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

export default ShiftPage;
