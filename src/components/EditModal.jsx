
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { memo, useEffect, useState } from 'react';
import { updateAccount } from '../API/home';

function EditModal(props) {

  const [item, setItem] = useState({
    'name': '',
    'fullName': '',
    address: ''
  })

  useEffect(() => {
    setItem({
      'name': props.accountSelected.name,
      'fullName': props.accountSelected.fullName,
      address: props.accountSelected.address,
      image: props.accountSelected.image
  })
  },[props.accountSelected])

  const handleChangeInput = (e) => {
    setItem((prev) => {
      return{
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  
  const handleCloneModal = () => {
    setItem({
      name: '',
      fullName: '',
      address: ''
    })
    props.handleClose()
  }

  const handleSave = async () => {
    await updateAccount(props.accountSelected.id, item)
    props.handleClose()

  }

  return (
   <>
      <Modal show={props.show} onHide={handleCloneModal}>
        <Modal.Header >
          <Modal.Title>Chỉnh Sửa Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tên Sản Phẩm</Form.Label>
                    <Form.Control type="text" placeholder="Tên Sản Phẩm" defaultValue={props.accountSelected.name} 
                      name='name' value={item.name}
                     onChange={handleChangeInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Dòng Vợt</Form.Label>
                    <Form.Control type="text" placeholder="Dòng Vợt"  defaultValue={props.accountSelected.fullName} 
                        name="fullName" value={item.fullName}
                     onChange={handleChangeInput}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Giá</Form.Label>
                    <Form.Control type="text" placeholder="Giá"  defaultValue={props.accountSelected.address} 
                      onChange={handleChangeInput}
                      name="address" value={item.address}
                    />
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
          <Button variant="secondary" onClick={handleCloneModal}>
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

export default memo(EditModal);