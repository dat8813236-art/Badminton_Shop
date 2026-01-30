
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
      address: props.accountSelected.address
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
      <Modal  show={props.show}>
        <Modal.Header >
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" defaultValue={props.accountSelected.name} 
                      name='name' value={item.name}
                     onChange={handleChangeInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name"  defaultValue={props.accountSelected.fullName} 
                        name="fullName" value={item.fullName}
                     onChange={handleChangeInput}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Last Name"  defaultValue={props.accountSelected.address} 
                      onChange={handleChangeInput}
                      name="address" value={item.address}
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