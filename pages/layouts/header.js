import { Row, Col, Nav } from "react-bootstrap";

export default function Header() {
    return (
      <>
        <Col className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <Row className="fs-4">EasyRetrospective</Row>
          </a>
  
          <Nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          </Nav>
        </Col>
      </>
    );
  }
  