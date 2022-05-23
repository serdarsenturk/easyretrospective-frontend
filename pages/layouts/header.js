import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faHome, faTachometer } from "@fortawesome/free-solid-svg-icons";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import Link from "next/link";
import {
  useAuthUser,
  withAuthUser
} from 'next-firebase-auth';

function Header() {
  const AuthUser = useAuthUser();
  const email = AuthUser.email;
  const signOut = AuthUser.signOut;

  return (
    <>
    <Container fluid>
      <Navbar bg="light" variant="light">
        <Navbar.Brand className="logo">
          <FontAwesomeIcon icon={faColumns}/> EasyRetrospective
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Container>
          <Nav className="mr-auto">
            <Nav.Link href="/"><FontAwesomeIcon icon={faHome} aria-hidden="true"/> Home</Nav.Link>
            <Nav.Link href="/dashboard"><FontAwesomeIcon icon={faTachometer} aria-hidden="true"/> Dashboard</Nav.Link>
          </Nav>
        </Container>
        {email ?
        <>
        <Nav className="user-settings">
          <NavDropdown title={AuthUser.email} id="basic-nav-dropdown">
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => signOut()}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          </Nav>
        </> 
        :
        <>
        <div className="boards-menu">
          <Link href="/login">
              <button className="boards-btn btn">
                Sign in
              </button>
          </Link> 
        </div>       
        </>
        }
      </Navbar>
    </Container>
    </>
  );
  }
  
  export default withAuthUser()(Header)