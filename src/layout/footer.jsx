import { Container, Row, Col} from 'react-bootstrap';

export default function Footer(){
    return(
       <footer className="bg-dark text-light py-4 mt-auto">
        <Container>
            <Row>
            <Col md={6}>
                <h5>My App</h5>
                <p className="mb-0">© 2026 My Company</p>
            </Col>

            <Col md={6} className="text-md-end mt-3 mt-md-0">
                <a href="#" className="text-light me-3">Privacy</a>
                <a href="#" className="text-light">Terms</a>
            </Col>
            </Row>
        </Container>
    </footer>

    )
}