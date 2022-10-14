import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignUpPage() {
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/users/sign-up", { ...signUp });
      navigate("/login");
    } catch (error) {
      console.log(error);
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
        Join Us!
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className="loginLabel">Sign-up here</ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="userName">Username: </Form.Label>
              <Form.Control
                type="userName"
                name="userName"
                placeholder="NightRider"
                required
                value={signUp.userName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email: </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                required
                value={signUp.email}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            {!showPassword ? (
              <>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password: </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signUp.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password: </Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    value={signUp.password}
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
              type="submit"
              variant="btn btn-outline-dark btn-md"
              className="navBtnContent"
            >
              Submit
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

export default SignUpPage;
