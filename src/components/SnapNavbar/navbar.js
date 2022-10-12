// import { Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import logo from "../../assets/SNAPSCRAP-LOGO.png";

function SnapNavbar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function handleLogOut(e) {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  }

  return (
    <div>
      <Navbar>
        <NavbarBrand>
          <img
            alt="SnapScrap"
            src={logo}
            style={{
              height: 80,
              width: 80,
              borderRadius: 38,
            }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink onClick={handleLogOut}>Logout</NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  navigate("/users");
                }}
              >
                All Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default SnapNavbar;
