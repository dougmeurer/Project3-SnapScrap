import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function SignUpPage() {
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
      <Button onClick={toggle} type="button">
        Signup
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Signup</ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <label htmlFor="userName">Username: </label>
            <input
              id="userName"
              type="userName"
              name="userName"
              required
              value={signUp.userName}
              onChange={handleChange}
            />
            <br></br>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={signUp.email}
              onChange={handleChange}
            />
            <br></br>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              name="password"
              value={signUp.password}
              onChange={handleChange}
            />
            <button type="submit">Ok</button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Ok</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SignUpPage;
