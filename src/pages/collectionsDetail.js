import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../api/api";
import HandleEditCollection from "../components/HandleEditCollection/handleEditCollection";
import { AuthContext } from "../contexts/authContext";
import unliked from "../../src/assets/unliked.png";
import liked from "../../src/assets/liked.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

function CollectionsDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [coll, setColl] = useState();
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [preview, setPreview] = useState();
  const [togglePhoto, setTogglePhoto] = useState(true);
  const [reload, setReload] = useState(false);
  const { loggedUser } = useContext(AuthContext);

  const { collectionId } = useParams();

  useEffect(() => {
    async function fetchColl() {
      try {
        setIsLoading(true);
        const response = await api.get(
          `/collections/collection/${collectionId}`
        );
        setColl(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchColl();
  }, [reload]);

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

      await api.post(`/photos/create/${collectionId}`, { photoUrl: imgURL });
      setReload(!reload);
      setTogglePhoto(!togglePhoto);
      setImg(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePhoto(photo) {
    try {
      await api.delete(`/photos/delete/${photo}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddLikePhoto(photoId) {
    try {
      await api.put(`/photos/add-like/${photoId}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePhotoClick(photo) {
    if (photo.likes.includes(loggedUser.user._id)) {
      handleRemoveLikePhoto(photo._id);
      return;
    }

    handleAddLikePhoto(photo._id);
  }

  async function handleRemoveLikePhoto(photoId) {
    try {
      await api.put(`/photos/remove-like/${photoId}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      {!isLoading && (
        <div className="container">
          <Card.Header>
            <Card>
              <Card.Title className="colName2">
                {coll.collectionName}
              </Card.Title>
              <Card.Text>{coll.collectionDetails}</Card.Text>
              <p>{coll.photos.length} photos total</p>
            </Card>
            <Card.Body>
              <div className="adjustButton">
                {loggedUser.user._id !== coll.author._id ? (
                  <div>
                    <Link to={`/users/${coll.author._id}`}>
                      <Button
                        type="button"
                        variant="btn btn-outline-dark btn-sm my-1"
                        className="btnContent"
                      >
                        Back
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Button
                      type="button"
                      variant="btn btn-outline-dark btn-sm my-1"
                      className="btnContent"
                      onClick={() => navigate("/profile")}
                    >
                      Back
                    </Button>
                  </div>
                )}
                {coll.author._id === loggedUser.user._id && (
                  <HandleEditCollection
                    collectionId={collectionId}
                    reload={reload}
                    setReload={setReload}
                  />
                )}

                {coll.author._id === loggedUser.user._id && (
                  <>
                    {!togglePhoto ? (
                      <Form onSubmit={handleSubmit}>
                        <Form.Control type="file" onChange={handleImage} />
                        {img && (
                          <Image
                            src={preview}
                            alt="Avatar"
                            fluid
                            style={{
                              padding: 5,
                              borderRadius: 10,
                              width: 200,
                              height: "auto",
                            }}
                          />
                        )}
                        <Button
                          type="submit"
                          variant="btn btn-outline-success btn-sm my-1 mx-1"
                        >
                          Enter
                        </Button>
                        <Button
                          variant="btn btn-outline-dark btn-sm my-1"
                          className="btnContent"
                          onClick={() => {
                            setTogglePhoto(!togglePhoto);
                          }}
                          type="button"
                        >
                          Cancel
                        </Button>
                      </Form>
                    ) : (
                      <div>
                        <Button
                          onClick={() => {
                            setTogglePhoto(!togglePhoto);
                          }}
                          type="button"
                          className="btnContent"
                          variant="btn btn-outline-dark btn-sm my-1"
                        >
                          Add Foto
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Card.Body>
          </Card.Header>

          <div className="card3">
            {coll.photos.map((photo) => {
              return (
                <div key={photo._id} className="btnDivShow my-1">
                  <Card className="d-flex justify-content-between flex-wrap">
                    <Image
                      src={photo.photoUrl}
                      alt="Avatar"
                      className="mx-auto"
                      style={{
                        padding: 5,
                        borderRadius: 10,
                        width: 600,
                      }}
                    />
                    {coll.author._id !== loggedUser.user._id && (
                      <div>
                        <img
                          src={
                            photo.likes.includes(loggedUser.user._id)
                              ? liked
                              : unliked
                          }
                          onClick={() => handlePhotoClick(photo)}
                          width={25}
                          alt=""
                          className="btnHidden"
                        />
                      </div>
                    )}
                    {coll.author._id === loggedUser.user._id && (
                      <div>
                        <Button
                          className="btnHidden"
                          variant="btn btn-outline-danger btn-sm mx-1"
                          onClick={() => handleDeletePhoto(photo._id)}
                          type="button"
                        >
                          delete
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}

export default CollectionsDetail;
