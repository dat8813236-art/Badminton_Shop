import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotFound(){

    let nav = useNavigate();

    const handleBackHome = () => {
        nav('/')
    }
 
    return (
        <Container>
            <div>Not Found</div>
            <Button variant="link" onClick={handleBackHome}>Back Home</Button>
        </Container>
    )
}