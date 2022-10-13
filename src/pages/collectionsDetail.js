import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../api/api";
import HandleEditCollection from "../components/HandleEditCollection/handleEditCollection";
import { AuthContext } from "../contexts/authContext";
import unliked from "../../src/assets/unliked.png";
import liked from "../../src/assets/liked.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

  // async function handleAddlikeCollection(collId) {
  //   try {
  //     await api.put(`/collections/add-like/${collId}`);
  //     setReload(!reload);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // function handleCollectionClick(coll) {
  //   if (coll.likes.includes(loggedUser.user._id)) {
  //     handleRemoveLikeCollection(coll._id);
  //     return;
  //   }
  //   handleAddlikeCollection(coll._id);
  // }

  // async function handleRemoveLikeCollection(collId) {
  //   try {
  //     await api.put(`/collections/remove-collection/${collId}`);
  //     setReload(!reload);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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

  console.log(coll);
  return (
    <div>
      {!isLoading && (
        <div className="container">
          <h1>{coll.collectionName}</h1>
          {/* <button
            onClick={() => {
              handleCollectionClick(coll);
            }}
          ></button> */}
          {loggedUser.user._id !== coll.author._id ? (
            <Link to={`/users/${coll.author._id}`}>
              <button type="button">Back</button>
            </Link>
          ) : (
            <button type="button" onClick={() => navigate("/profile")}>
              Back
            </button>
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
                <form onSubmit={handleSubmit}>
                  <input type="file" onChange={handleImage} />
                  {img && <img src={preview} alt="Avatar" width={200} />}
                  <button type="submit">Enter</button>
                  <button
                    onClick={() => {
                      setTogglePhoto(!togglePhoto);
                    }}
                    type="button"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => {
                    setTogglePhoto(!togglePhoto);
                  }}
                  type="button"
                >
                  Add Foto
                </button>
              )}
            </>
          )}

          <div className="card">
            {coll.photos.map((photo) => {
              return (
                <div key={photo._id} className="btnDivShow">
                  <img src={photo.photoUrl} alt="Avatar" width={300} />
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
                    <button
                      className="btnHidden"
                      onClick={() => handleDeletePhoto(photo._id)}
                      type="button"
                    >
                      delete
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectionsDetail;
