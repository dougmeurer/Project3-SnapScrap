import { useContext, useEffect, useState } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateCollection({
  toggleCollection,
  setToggleCollection,
  reload,
  setReload,
  img,
  setImg,
  preview,
  setPreview,
}) {
  const { loggedUser } = useContext(AuthContext);
  const user = loggedUser.user._id;

  const [newCol, setNewCol] = useState({
    author: user,
    collectionName: "",
    collectionDetails: "",
    photos: [],
    likes: [],
  });

  function handleChange(e) {
    setNewCol({ ...newCol, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  useEffect(() => {
    if (!img) {
      setPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(img);
    setPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [img]);

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const imgURL = await handleUpload();

      const response = await api.post("/collections/create", { ...newCol });

      const collectionId = response.data._id;

      await api.post(`/photos/create/${collectionId}`, { photoUrl: imgURL });
      setReload(!reload);

      setToggleCollection(!toggleCollection);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Collection Name:</Form.Label>
          <Form.Control
            type="text"
            name="collectionName"
            required
            value={newCol.collectionName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>About:</Form.Label>
          <Form.Control
            type="text"
            name="collectionDetails"
            required
            value={newCol.collectionDetails}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control type="file" onChange={handleImage} />
          <Form.Group className="my-1">
            {img && (
              <img
                src={preview}
                alt=""
                className="my-2"
                style={{
                  height: 200,
                  width: 190,
                  borderRadius: 30,
                }}
              />
            )}
          </Form.Group>
          <Button type="submit" variant="btn btn-outline-success btn-sm my-1">
            Enter
          </Button>
          <Button
            variant="btn btn-outline-dark btn-sm my-1 mx-1"
            className="btnContent"
            onClick={() => {
              setToggleCollection(!toggleCollection);
            }}
          >
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateCollection;
