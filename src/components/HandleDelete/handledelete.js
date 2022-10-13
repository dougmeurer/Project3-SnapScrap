import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import Button from "react-bootstrap/Button";

function HandleDelete() {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      await api.delete(`/users/delete/${loggedUser.user._id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button
        variant="btn btn-outline-danger btn-sm"
        onClick={handleDelete}
        type="button"
      >
        Delete Account
      </Button>
    </>
  );
}

export default HandleDelete;
