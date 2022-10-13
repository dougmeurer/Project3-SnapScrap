import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import Button from "react-bootstrap/Button";

function HandleDeleteCollection({ collectionId }) {
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      await api.delete(`/collections/delete/${collectionId}`);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button
        onClick={handleDelete}
        type="button"
        variant="btn btn-outline-danger btn-sm mx-1"
      >
        Delete Collection
      </Button>
    </>
  );
}

export default HandleDeleteCollection;
