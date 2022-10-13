import { useEffect, useState } from "react";
import { api } from "../../api/api";
import HandleDelete from "../HandleDelete/handledelete";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function HandleEdit({
  user,
  reload,
  setReload,
  setToggleEdit,
  toggleEdit,
  img,
  setImg,
  preview,
  setPreview,
}) {
  const [editUser, setEditUser] = useState({
    name: user.name,
    userName: user.userName,
    profilePicture: user.profilePicture,
  });

  function handleChange(e) {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
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

      await api.put("/users/edit-user", {
        name: editUser.name,
        userName: editUser.userName,
        profilePicture: imgURL,
      });

      setReload(!reload);
      setToggleEdit(!toggleEdit);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(editUser);
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label htmlFor="name">Name: </Form.Label>
          <Form.Control
            id="name"
            name="name"
            value={editUser.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label htmlFor="userName">User Name: </Form.Label>
          <Form.Control
            id="userName"
            name="userName"
            value={editUser.userName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoto">
          <Form.Control id="photo" type="file" onChange={handleImage} />
          <br></br>
          <Form.Group className="mb-3" controlId="formBasicPhoto">
            {img && (
              <img
                src={preview}
                alt=""
                style={{
                  height: 200,
                  width: 190,
                  borderRadius: 20,
                }}
              />
            )}
          </Form.Group>
        </Form.Group>
        <Button type="submit" variant="btn btn-outline-success btn-sm">
          Save
        </Button>
        <HandleDelete />
      </Form>
    </div>
  );
}

export default HandleEdit;
