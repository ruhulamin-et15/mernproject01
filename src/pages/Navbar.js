import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

function OffcanvasExample() {
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-success fixed-top">
          <Container fluid>
            <Link to="/" className="text-decoration-none text-black">
              Ruhul Amin
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              className="w-50"
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Nav.Link>
                    <Link className="text-decoration-none text-black" to="/">
                      Home
                    </Link>
                  </Nav.Link>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link>
                    <Link
                      className="text-decoration-none text-black"
                      to="/profile"
                    >
                      Dashboard
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      className="text-decoration-none text-black"
                      to="/register"
                    >
                      Register
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      className="text-decoration-none text-black"
                      to="/login"
                    >
                      Login
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      className="text-decoration-none text-black"
                      to="/admin"
                    >
                      Admin
                    </Link>
                  </Nav.Link>

                  <NavDropdown
                    className="mb-1"
                    title="Mode"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item>
                      <Link
                        className="text-decoration-none text-black"
                        to="/profile"
                      >
                        Profile
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link
                        className="text-decoration-none text-black"
                        to="/admin"
                      >
                        Admin
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button type="submit" variant="outline-success bg-warning">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
