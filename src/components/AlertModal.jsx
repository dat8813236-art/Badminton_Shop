import { Alert } from "react-bootstrap"


export default function AlertModal(props){
    return(
        <Alert show={props.isAlert} variant="success" onClose={props.handleCloseAlert} dismissible>
            Delete Success
        </Alert>
    )
}