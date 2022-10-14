import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { AuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

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
    <div>
      <Button
        variant="btn btn-outline-light btn-lg"
        className="signBtnContent"
        onClick={toggle}
        type="button"
      >
        Login
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className="loginLabel">Login</ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>
            {!showPassword ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password:</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Check me out"
                onChange={() => setShowPassword(!showPassword)}
              />
            </Form.Group>
            <Button
              className="navBtnContent"
              type="submit"
              variant="btn btn-outline-dark btn-md"
            >
              Enter
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="btn btn-outline-danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginPage;
