import { Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <>
      <Row className="pt-4 my-md-5 pt-md-5 border-top">
        <Row>
          <Col className="social-links text-center text-md-right pt-3 pt-md-0">
            <p>
              <strong>Contact: </strong> info@easyretrospective.com<br/>
            </p>
          </Col>
        </Row>
      </Row>
    </>
  );
}
