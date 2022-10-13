import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { AuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Label } from "reactstrap";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setLoggedUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", form);
      setLoggedUser({ ...response.data });
      localStorage.setItem("loggedUser", JSON.stringify(response.data));
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  }

  return (
    <Container fluid>
      <Button
        variant="btn btn-outline-light btn-lg"
        className="signBtnContent"
        onClick={toggle}
        type="button"
      >
        Login
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Sign-up here</ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Label className="loginLabel">Login</Label>
            <Form.Group className="mb-3" >
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>
            {!showPassword ? (
              <Form.Group className="mb-3" >
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3" >
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" >
              <Form.Control
                type="checkbox"
                label="Check me out"
                onChange={() => setShowPassword(!showPassword)}
              />
              <Button type="submit">Enter</Button>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="btn btn-outline-danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default LoginPage;
