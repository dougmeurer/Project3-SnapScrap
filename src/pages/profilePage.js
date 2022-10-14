import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import CreateCollection from "../components/CreateCollection/createcollection";
import HandleEdit from "../components/HandleEdit/handleedit";
import MyCollection from "../components/MyCollection/mycollection";
import Button from "react-bootstrap/Button";

export function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    userName: "",
    email: "",
    profilePicture: "",
    collections: [],
    followers: [],
    following: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(true);
  const [toggleCollection, setToggleCollection] = useState(true);
  const [img, setImg] = useState("");
  const [preview, setPreview] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await api.get("/users/profile");
      setUser(response.data);
      setIsLoading(false);
    }

    fetchUser();
  }, [reload]);

  return (
    <div>
      {!isLoading && (
        <div className="profileFlex clearfix">
          <img
            src={user.profilePicture}
            alt="profile"
            className="profilePicShadow"
            style={{
              height: 200,
              width: 190,
              borderRadius: 100,
            }}
          />
          <div className="profileFlex">
            <h1 className="profileNames">
              Welcome, {user.name ? <>{user.name}!</> : <>{user.email}.</>}
            </h1>
            {user.userName ? (
              <p className="userNames">@{user.userName}</p>
            ) : null}

            <Button
              variant="btn btn-outline-dark btn-sm my-1"
              className="btnContent"
              onClick={() => {
                setToggleEdit(!toggleEdit);
              }}
            >
              Edit Profile
            </Button>
            {!toggleEdit && (
              <HandleEdit
                user={user}
                setReload={setReload}
                reload={reload}
                setToggleEdit={setToggleEdit}
                toggleEdit={toggleEdit}
                img={img}
                setImg={setImg}
                preview={preview}
                setPreview={setPreview}
              />
            )}

            <Button
              variant="btn btn-outline-dark btn-sm my-1"
              className="btnContent"
              onClick={() => {
                setToggleCollection(!toggleCollection);
              }}
            >
              Create Collection
            </Button>
            <Button
              onClick={() => {
                navigate("/users/followers");
              }}
              variant="btn btn-outline-dark btn-sm my-1"
              className="btnContent"
            >
              Followers
            </Button>
            <Button
              variant="btn btn-outline-dark btn-sm my-1"
              className="btnContent"
              onClick={() => {
                navigate("/users/following");
              }}
            >
              Following
            </Button>
            {!toggleCollection && (
              <CreateCollection
                toggleCollection={toggleCollection}
                setToggleCollection={setToggleCollection}
                reload={reload}
                setReload={setReload}
                img={img}
                setImg={setImg}
                preview={preview}
                setPreview={setPreview}
              />
            )}
          </div>
          <MyCollection reload={reload} setReload={setReload} />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
