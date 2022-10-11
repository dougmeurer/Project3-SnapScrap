import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { v4 as uuidv4 } from "uuid";
import CreateCollection from "../components/CreateCollection/createcollection";
import HandleEdit from "../components/HandleEdit/handleedit";
import MyCollection from "../components/MyCollection/mycollection";

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
        <>
          <img src={user.profilePicture} alt="profile" width={100} />
          <div>
            <h1>
              Welcome, {user.name ? <>{user.name}!</> : <>{user.email}.</>}
            </h1>
            {user.userName ? <p>@{user.userName}</p> : <></>}

            <button
              onClick={() => {
                setToggleEdit(!toggleEdit);
              }}
            >
              Edit
            </button>
            {!toggleEdit && (
              <HandleEdit
                user={user}
                setReload={setReload}
                reload={reload}
                setToggleEdit={setToggleEdit}
                toggleEdit={toggleEdit}
              />
            )}

            <button
              onClick={() => {
                setToggleCollection(!toggleCollection);
              }}
            >
              Create Collection
            </button>
            <Link to={"/users/followers"} key={uuidv4()}>
              Followers
            </Link>
            <Link to={"/users/following"} key={uuidv4()}>
              Following
            </Link>
            {!toggleCollection && (
              <CreateCollection
                toggleCollection={toggleCollection}
                setToggleCollection={setToggleCollection}
                reload={reload}
                setReload={setReload}
              />
            )}
          </div>
          <MyCollection reload={reload} setReload={setReload} />
        </>
      )}
    </div>
  );
}

export default ProfilePage;
