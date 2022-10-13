import { useState } from "react";
import { api } from "../../api/api";
import HandleDeleteCollection from "../HandleDeleteCollection/handleDelete";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function HandleEditCollection({ reload, setReload, collectionId }) {
  const [editColl, setEditColl] = useState({
    collectionName: "",
    collectionDetails: "",
  });
  const [formToggle, setFormToggle] = useState(true);

  function handleChange(e) {
    setEditColl({ ...editColl, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/collections/edit/${collectionId}`, { ...editColl });

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <>
        {!formToggle ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-1">
              <Form.Label htmlFor="collectionName">
                Collection name:{" "}
              </Form.Label>
              <Form.Control
                id="collectionName"
                name="collectionName"
                value={editColl.collectionName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label htmlFor="collectionName">
                Collection name:{" "}
              </Form.Label>
              <Form.Control
                id="collectionName"
                name="collectionName"
                value={editColl.collectionName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="my-1">
              <Form.Label htmlFor="collectionDetails">Details: </Form.Label>
              <Form.Control
                id="collectionDetails"
                name="collectionDetails"
                required
                value={editColl.collectionDetails}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="my-1">
              <Button
                type="submit"
                variant="btn btn-outline-success btn-sm my-1 mx-1"
              >
                Save
              </Button>
              <Button
                variant="btn btn-outline-dark btn-sm my-1"
                className="btnContent"  
                onClick={() => {
                  setFormToggle(!formToggle);
                }}
                type="button"
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        ) : (
          <>
            <Button
              variant="btn btn-outline-dark btn-sm my-1"
              className="btnContent"
              onClick={() => {
                setFormToggle(!formToggle);
              }}
              type="button"
            >
              Edit Collection
            </Button>
          </>
        )}
        <HandleDeleteCollection collectionId={collectionId} />
      </>
    </div>
  );
}

export default HandleEditCollection;
