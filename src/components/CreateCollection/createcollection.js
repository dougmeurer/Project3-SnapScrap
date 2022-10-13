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

  console.log(reload);

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
        <Form.Label>Collection Name:</Form.Label>
        <Form.Control
          type="text"
          name="collectionName"
          required
          value={newCol.collectionName}
          onChange={handleChange}
        />
        <Form.Label>About:</Form.Label>
        <Form.Control
          type="text"
          name="collectionDetails"
          required
          value={newCol.collectionDetails}
          onChange={handleChange}
        />
        <Form.Control type="file" onChange={handleImage} />
        {img && <img src={preview} alt="" width={200} />}
        <button type="submit">Enter</button>
        <button
          onClick={() => {
            setToggleCollection(!toggleCollection);
          }}
        >
          Cancel
        </button>
      </Form>
    </div>
  );
}

export default CreateCollection;
