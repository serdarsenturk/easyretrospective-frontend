import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faHome, faTachometer } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Header() {
    return (
      <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <FontAwesomeIcon icon={faColumns}/> EasyRetrospective
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/"><FontAwesomeIcon icon={faHome} aria-hidden="true"/> Home</Nav.Link>
              <Nav.Link href="/dashboard"><FontAwesomeIcon icon={faTachometer} aria-hidden="true"/> Dashboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    );
  }
  