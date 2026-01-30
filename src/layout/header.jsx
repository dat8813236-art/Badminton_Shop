import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header(){
    return(      
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
              <Navbar.Brand href="#home">REACT</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
          </Container>
        </Navbar>
    )
}