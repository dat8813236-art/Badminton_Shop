import axios from "axios";
import { useState } from "react";
import { Modal, Form , Button} from "react-bootstrap";
import { toast } from "react-toastify";
import {addSchema} from "../validate/Add"


export default function Add(props){
    const [item, setItem] = useState({
        'name': '',
        fullName: '',
        address: '' , 
        image: ''
    });
    


    const [errors, setErrors] = useState({});
    const handleChangeInput = (e) => {
        setItem(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }));
      
        setErrors(prev => ({
          ...prev,
          [e.target.name]: null
        }));
      };
      

      const handleSave = async () => {
        const { error } = addSchema.validate(item, { abortEarly: false });
      
        if (error) {
          const newErrors = {};
          error.details.forEach(err => {
            newErrors[err.path[0]] = err.message;
          });
          setErrors(newErrors);
          return;
        }
      
        try {
          await axios.post(
            "https://6961f5f2d9d64c761906945c.mockapi.io/test",
            item
          );
      
          toast.success("Bạn thêm thành công");
      
          props.handleSaveCreate(); // đóng modal + reload list
        } catch (err) {
          console.error(err);
          toast.error("Thêm thất bại");
        }
      };
      
    

     return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>

                <Modal.Header >
                <Modal.Title>Thêm Sản Phẩm </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tên Sản Phẩm </Form.Label>
                            <Form.Control
  type="text"
  placeholder="Tên Sản Phẩm"
  name="name"
  value={item.name}
  onChange={handleChangeInput}
/>

                            {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Dòng Vợt </Form.Label>
                            <Form.Control
  type="text"
  placeholder="Dòng Vợt"
  name="fullName"
  value={item.fullName}
  onChange={handleChangeInput}
/>


                             {errors.fullName && <p style={{color: 'red'}}>{errors.fullName}</p>}

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Giá </Form.Label>
                            <Form.Control
  type="text"
  placeholder="Giá"
  name="address"
  value={item.address}
  onChange={handleChangeInput}
/>


                             {errors.address && <p style={{color: 'red'}}>{errors.address}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
  <Form.Label>Ảnh sản phẩm (URL)</Form.Label>
  <Form.Control
    type="text"
    name="image"
    value={item.image}
    onChange={handleChangeInput}
  />
</Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
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