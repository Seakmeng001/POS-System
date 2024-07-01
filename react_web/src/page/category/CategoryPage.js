import { Stack, Table, Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import { request } from "../../share/request";
import { useEffect, useState } from "react";

const CategoryPage = () => {
    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [total, setTotal] = useState(0);
    const [CategoryId, setcategoryId] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Parent, setParent] = useState("");
    const [Status, setStatus] = useState("");

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => { // create function success
        // request("category","get",{}).then(res=>{
        //     if(res){
        //         setList(res.list)
        //     }
        // })
        
        const res = await request("category","get",{})
        if(res){
            setList(res.list)
            setTotal(res.total[0].Total);
        }
    }

    const onClickEdit = (item) => {
        setcategoryId(item.Id);
        setName(item.Name);
        setDescription(item.Description);
        setStatus(item.Status)
        setVisible(true) // just opent
    };
    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const onChangeDes = (event) => {
        setDescription(event.target.value)
    }

    const onChangeStatus = (event) => {
        setStatus(event.target.value)
    }
    const onChangeParent = (event) => {
        setParent(event.target.value)
    }

    const onDelete = async (Id) => {
        try {
            const res = await request(`category/${Id}`, "delete", {});
            if (res && !res.error) {
                getList();
            } else {
                alert(res.message || "Error deleting category!");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("An error occurred while deleting the category.");
        }
    };
    

    const onOpenModal = () => {
        setVisible(true);
    };
    const onCloseModal = () => {
        setVisible(false)
        setcategoryId("")
        setName("")
        setDescription("")
        setStatus("")
    }

    const onCancel = () => {
        setVisible(false);
        onClear();
    };

    const onClear = () => {
        setcategoryId("");
        setName("");
        setDescription("");
        setParent("");
        setStatus("");
    };

    const onSubmit = () => {
        if(CategoryId== ""){
            var data = {
                Name : Name, 
                Description : Description, 
                Parent : Parent, 
                Status : Status
            }
            const res = request("category","post",data)
            onCancel()
            if(res){
                getList(); // re call function list 
            }else{
                alert("Error!")
            }
        }else{
            // update
            var data = {
                Id : CategoryId, 
                Name : Name, 
                Description : Description, 
                Parent : Parent, 
                Status : Status
            }
            const res = request("category","put",data)
            onCloseModal()
            if(res){
                getList(); // re call function list 
            }else{
                alert("Error!")
            }
        }
        
        }

       
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5 }}>
                
                <div>Total: {total} Category</div>
                <Button onClick={onOpenModal}>New Category</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Parent</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Name}</td>
                            <td>{item.Description}</td>
                            <td>{item.Parent}</td>
                            <td>{item.Status ==1 ? "Active" : "Disabled "}</td>
                            <td style={{ width: 100 }}>
                                <Stack gap={1} direction="horizontal">
                                    <Button size='small' onClick={() => onClickEdit(item)}>Edit</Button>{' '}
                                    <Button size='small' variant="danger" onClick={() => onDelete(item.Id)}>Delete</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={visible}>
                <Modal.Header>
                    <Modal.Title>{(CategoryId === "") ? "New" : "Update"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="Name" label="Name" className="mb-3">
                        <Form.Control onChange={onChangeName} value={Name} type="text" placeholder="Name" />
                    </FloatingLabel>
                    <FloatingLabel controlId="Description" label="Description" className="mb-3">
                        <Form.Control onChange={onChangeDes} value={Description} type="text" placeholder="Description" />
                    </FloatingLabel>
                    <FloatingLabel controlId="Parent" label="Parent" className="mb-3">
                        <Form.Control onChange={onChangeParent} value={Parent} type="text" placeholder="Parent" />
                    </FloatingLabel>
                    <FloatingLabel controlId="Status" label="Status" className="mb-3">
                        <Form.Control onChange={onChangeStatus } value={Status} type="text" placeholder="Status" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="secondary" onClick={onClear}>Clear</Button>
                    <Button variant="primary" onClick={onSubmit}>{(CategoryId === "") ? "Save" : "Update"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CategoryPage;
