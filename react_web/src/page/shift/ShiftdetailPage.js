import { Stack, Table, Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import { request } from "../../share/request";
import { useEffect, useState } from "react";

const ShiftdetailPage = () => {
    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [total, setTotal] = useState(0);
    const [ShiftDetailId, setShiftDetailId] = useState("");
    const [Id, setId] = useState("");
    const [ShiftId, setShiftId] = useState("");
    const [EmployeeId, setEmployeeId] = useState("");
    const [OpenningBalance, setOpenningBalance] = useState("");
    const [IsClose, setIsClose] = useState("");

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        try {
            const res = await request("shift_details", "get", {});
            if (res && !res.error) {
                setList(res.list || []);
                setTotal(res.list ? res.list.length : 0);
            } else {
                console.error("Error fetching shift details:", res.message);
            }
        } catch (error) {
            console.error("Error fetching shift details:", error);
        }
    };

    const onClickEdit = (item) => {
        setShiftDetailId(item.Id);
        setId(item.Id);
        setShiftId(item.ShiftId);
        setEmployeeId(item.EmployeeId);
        setOpenningBalance(item.OpenningBalance);
        setIsClose(item.IsClose);
        setVisible(true);
    };

    const onChangeId = (event) => setId(event.target.value);
    const onChangeShiftId = (event) => setShiftId(event.target.value);
    const onChangeEmployeeId = (event) => setEmployeeId(event.target.value);
    const onChangeOpenningBalance = (event) => setOpenningBalance(event.target.value);
    const onChangeIsClose = (event) => setIsClose(event.target.value);

    const onDelete = async (Id) => {
        try {
            const res = await request(`shift_details/${Id}`, "delete", {});
            if (res && !res.error) {
                getList();
            } else {
                alert(res.message || "Error deleting shift details!");
            }
        } catch (error) {
            console.error("Error deleting shift details:", error);
            alert("An error occurred while deleting the shift details.");
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
        setShiftDetailId("");
        setId("");
        setShiftId("");
        setEmployeeId("");
        setOpenningBalance("");
        setIsClose("");
    };

    const onSubmit = async () => {
        const data = {
            Id,
            ShiftId,
            EmployeeId,
            OpenningBalance,
            IsClose
        };

        try {
            let res;
            if (ShiftDetailId === "") {
                res = await request("shift_details", "post", data);
            } else {
                data.Id = ShiftDetailId;
                data.ShiftId = ShiftId;
                data.EmployeeId = EmployeeId;
                data.OpenningBalance = OpenningBalance;
                data.IsClose = IsClose;


                res = await request("shift_details", "put", data);
            }

            if (res && !res.error) {
                getList();
                onCloseModal();
            } else {
                alert(res.message || "Error saving shift details!");
            }
        } catch (error) {
            console.error("Error saving shift details:", error);
            alert("An error occurred while saving shift details.");
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5 }}>
                <div>Total: {total} shift details</div>
                <Button onClick={onOpenModal}>New shift details</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Shift Id</th>
                        <th>Employee Id</th>
                        <th>Openning Balance</th>
                        <th>Close</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Id}</td>
                            <td>{item.ShiftId}</td>
                            <td>{item.EmployeeId}</td>
                            <td>{item.OpenningBalance}</td>
                            <td>{item.IsClose}</td>
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
                    <Modal.Title>{(ShiftDetailId === "") ? "New" : "Update"} Shift Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="Id" label="Id" className="mb-3">
                        <Form.Control onChange={onChangeId} value={Id} type="text" placeholder="Shift detail Id" />
                    </FloatingLabel>
                    <FloatingLabel controlId="ShiftId" label="Shift Id" className="mb-3">
                        <Form.Control onChange={onChangeShiftId} value={ShiftId} type="text" placeholder="Shift Id" />
                    </FloatingLabel>
                    <FloatingLabel controlId="EmployeeId" label="Employee Id" className="mb-3">
                        <Form.Control onChange={onChangeEmployeeId} value={EmployeeId} type="text" placeholder="Employee Id" />
                    </FloatingLabel>
                    <FloatingLabel controlId="OpenningBalance" label="Opening Balance" className="mb-3">
                        <Form.Control onChange={onChangeOpenningBalance} value={OpenningBalance} type="text" placeholder="Opening Balance" />
                    </FloatingLabel>
                    <FloatingLabel controlId="IsClose" label="Close" className="mb-3">
                        <Form.Control onChange={onChangeIsClose} value={IsClose} type="text" placeholder="Is Close" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="secondary" onClick={onClear}>Clear</Button>
                    <Button variant="primary" onClick={onSubmit}>{(ShiftDetailId === "") ? "Save" : "Update"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ShiftdetailPage;
