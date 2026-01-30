import axios from "axios";
import { useState } from "react";
import { Modal, Form , Button} from "react-bootstrap";
import { toast } from "react-toastify";
import {addSchema} from "../validate/Add"


export default function Add(props){
    const [item, setItem] = useState({
        'name': '',
        fullName: '',
        address: ''
    });

    const [errors, setErrors] = useState({});

    const handleChangeInput = (e) => {
        setItem((prev) => {
            return{
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSave = () => {
    
        const { error } = addSchema.validate(item, {
            abortEarly: false
        });

        if (error) {
            console.log(error.details)
            const newErrors = {};
                error.details.forEach(item => {
                    newErrors[item.path[0]] = item.message;
                });
                setErrors(newErrors);
            return
        }


        axios.post(`https://6961f5f2d9d64c761906945c.mockapi.io/test`, item).then(() => {
            toast('Ban them thanh cong')
        })

        props.handleSaveCreate()
    }

     return (
        <>
            <Modal  show={props.show}>
                <Modal.Header >
                <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name"
                            name='name'  
                            onChange={handleChangeInput} />
                            {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name"
                                name="fullName"  value={item.fullName}
                            onChange={handleChangeInput}/>

                             {errors.fullName && <p style={{color: 'red'}}>{errors.fullName}</p>}

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Last Name"  
                            onChange={handleChangeInput}
                            name="address"
                            />

                             {errors.address && <p style={{color: 'red'}}>{errors.address}</p>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary">
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
  );
}