// import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/SNAPSCRAP-LOGO.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function SnapNavbar() {
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(AuthContext);

  function handleLogOut(e) {
    localStorage.removeItem("loggedUser");
    setLoggedUser(null);
    navigate("/");
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="light" className="mb-3">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img
              alt="SnapScrap"
              src={logo}
              style={{
                height: 80,
                width: 80,
                borderRadius: 25,
              }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id="offcanvasNavbarLabel-expand-sm"
              className="canvaTitle"
            >
              SnapScrap
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-1">
              <Button
                variant="light"
                className="navBtnContent"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Button>
              <Button
                variant="light"
                className="navBtnContent"
                onClick={() => {
                  navigate("/users");
                }}
              >
                All Users
              </Button>
              <Button
                variant="light"
                className="navBtnContent"
                onClick={() => {
                  navigate("/allCollectionsPage");
                }}
              >
                {" "}
                Collections
              </Button>
              <Button
                variant="light"
                className="navBtnContent"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </Button>
              <Button
                variant="light"
                className="navBtnContent"
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default SnapNavbar;
