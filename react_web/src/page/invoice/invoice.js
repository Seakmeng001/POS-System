import { Stack, Table, Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import { request } from "../../share/request";
import { useEffect, useState } from "react";

const Invoice = () => {
    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [total, setTotal] = useState(0);
    const [Id, setId] = useState("");
    const [invoiceId, setInvoiceId] = useState("");
    const [InvoiceNo, setInvoiceNo] = useState("");
    const [ShiftDetailId, setShiftDetailId] = useState("");
    const [CustomerId, setCustomerId] = useState("");
    const [PaymentMethodId, setPaymentMethodId] = useState("");
    const [TotalAmount, setTotalAmount] = useState("");
    const [InvoiceStatusId, setInvoiceStatusId] = useState("");
    const [TotalPaid, setTotalPaid] = useState("");

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        const res = await request("invoice", "get", {});
        if (res && res.list) {
            setList(res.list);
            setTotal(res.list.length);
        } else {
            setList([]);
            setTotal(0);
        }
    };

    const onClickEdit = (item) => {
        setId(item.Id);
        setInvoiceId(item.invoiceId);
        setInvoiceNo(item.InvoiceNo);
        setShiftDetailId(item.ShiftDetailId);
        setCustomerId(item.CustomerId);
        setPaymentMethodId(item.PaymentMethodId);
        setTotalAmount(item.TotalAmount);
        setInvoiceStatusId(item.InvoiceStatusId);
        setTotalPaid(item.TotalPaid);

        setVisible(true);
    };
    const onChangeId= (event)=>{
        setId(event.target.value);
    }
    const onChangeInvoiceNo = (event) => {
        setInvoiceNo(event.target.value);
    };

    const onChangeShiftDetailId = (event) => {
        setShiftDetailId(event.target.value);
    };

    const onChangeCustomerId = (event) => {
        setCustomerId(event.target.value);
    };

    const onChangePaymentMethodId = (event) => {
        setPaymentMethodId(event.target.value);
    };

    const onChangeTotalAmount = (event) => {
        setTotalAmount(event.target.value);
    };

    const onChangeInvoiceStatusId = (event) => {
        setInvoiceStatusId(event.target.value);
    };

    const onChangeTotalPaid = (event) => {
        setTotalPaid(event.target.value);
    };

    const onDelete = async (Id) => {
        try {
            const res = await request(`invoice/${Id}`, "delete", {});
            if (res && !res.error) {
                getList();
            } else {
                alert(res.message || "Error deleting invoice!");
            }
        } catch (error) {
            console.error("Error deleting invoice:", error);
            alert("An error occurred while deleting the invoice.");
        }
    };

    const onOpenModal = () => {
        setVisible(true);
    };

    const onCloseModal = () => {
        setVisible(false);
        onClear();
    };

    const onCancel = () => {
        setVisible(false);
        onClear();
    };

    const onClear = () => {
        setId("");
        setInvoiceId("");
        setInvoiceNo("");
        setShiftDetailId("");
        setCustomerId("");
        setPaymentMethodId("");
        setTotalAmount("");
        setInvoiceStatusId("");
        setTotalPaid("");
    };

    const onSubmit = async () => {
        const data = {
            Id:Id,
            InvoiceNo: InvoiceNo,
            ShiftDetailId: ShiftDetailId,
            CustomerId: CustomerId,
            PaymentMethodId: PaymentMethodId,
            TotalAmount: TotalAmount,
            InvoiceStatusId: InvoiceStatusId,
            TotalPaid: TotalPaid,
        };

        try {
            let res;
            if (Id == "") {
                res = await request("invoice", "post", data);
            } else {
                data.Id = Id;
                res = await request("invoice", "put", data);
            }

            if (res && !res.error) {
                getList();
                onCloseModal();
            } else {
                alert(res.message || "Error saving invoice!");
            }
        } catch (error) {
            console.error("Error submitting invoice:", error);
            alert("An error occurred while saving the invoice.");
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5 }}>
                <div>Total: {total} Invoice{total !== 1 ? 's' : ''}</div>
                <Button onClick={onOpenModal}>New Invoice</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Invoice No</th>
                        <th>Shift Detail Id</th>
                        <th>Customer Id</th>
                        <th>Payment Method Id</th>
                        <th>Total Amount</th>
                        <th>Total Paid</th>
                        <th>Invoice Status Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={item.Id}>
                            <td>{index + 1}</td>
                            <td>{item.Id}</td>
                            <td>{item.InvoiceNo}</td>
                            <td>{item.ShiftDetailId}</td>
                            <td>{item.CustomerId}</td>
                            <td>{item.PaymentMethodId}</td>
                            <td>{item.TotalAmount}</td>
                            <td>{item.TotalPaid}</td>
                            <td>{item.InvoiceStatusId}</td>
                            <td style={{ width: 100 }}>
                                <Stack gap={1} direction="horizontal">
                                    <Button size='sm' onClick={() => onClickEdit(item)}>Edit</Button>
                                    <Button size='sm' variant="danger" onClick={() => onDelete(item.Id)}>Delete</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={visible} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{(invoiceId === "") ? "New" : "Update"} Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <FloatingLabel controlId="Id" label="Id" className="mb-3">
                        <Form.Control onChange={onChangeId} value={Id} type="text" placeholder=" Id " />
                    </FloatingLabel>
                    <FloatingLabel controlId="InvoiceNo" label="Invoice No" className="mb-3">
                        <Form.Control onChange={onChangeInvoiceNo} value={InvoiceNo} type="text" placeholder="Invoice No" />
                    </FloatingLabel>
                    <FloatingLabel controlId="ShiftDetailId" label="Shift Detail Id" className="mb-3">
                        <Form.Control onChange={onChangeShiftDetailId} value={ShiftDetailId} type="text" placeholder="Shift Detail Id" />
                    </FloatingLabel>
                    <FloatingLabel controlId="CustomerId" label="Customer Id" className="mb-3">
                        <Form.Control onChange={onChangeCustomerId} value={CustomerId} type="text" placeholder="Customer Id" />
                    </FloatingLabel>
                    <FloatingLabel controlId="PaymentMethodId" label="Payment Method Id" className="mb-3">
                        <Form.Control onChange={onChangePaymentMethodId} value={PaymentMethodId} type="text" placeholder="Payment Method Id" />
                    </FloatingLabel>
                    <FloatingLabel controlId="TotalPaid" label="Total Paid" className="mb-3">
                        <Form.Control onChange={onChangeTotalPaid} value={TotalPaid} type="text" placeholder="Total Paid" />
                    </FloatingLabel>
                    <FloatingLabel controlId="InvoiceStatusId" label="Invoice Status Id" className="mb-3">
                        <Form.Control onChange={onChangeInvoiceStatusId} value={InvoiceStatusId} type="text" placeholder="Invoice Status Id" />
                    </FloatingLabel>
                    <FloatingLabel controlId="TotalAmount" label="Total Amount" className="mb-3">
                        <Form.Control onChange={onChangeTotalAmount} value={TotalAmount} type="text" placeholder="Total Amount" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="secondary" onClick={onClear}>Clear</Button>
                    <Button variant="primary" onClick={onSubmit}>{(Id === "") ? "Save" : "Update"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Invoice;
