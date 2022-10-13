import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../contexts/authContext";

function UsersDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const { loggedUser } = useContext(AuthContext);
  const [reload, setReload] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await api.get(`/users/user/${userId}`);
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [reload]);

  function handleFollowing() {
    if (following()) {
      handleUnfollow();
      return;
    }

    handleFollow();
  }

  async function handleFollow() {
    try {
      await api.put(`users/follow/${user._id}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUnfollow() {
    try {
      await api.put(`users/unfollow/${user._id}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  function following() {
    const isFound = user.followers.some((element) => {
      if (element._id === loggedUser.user._id) {
        return true;
      }

      return false;
    });
    return isFound;
  }

  return (
    <div>
      {!isLoading && (
        <>
          <div>
            <img
              src={user.profilePicture}
              alt=""
              style={{
                height: 150,
                width: 145,
                borderRadius: 50,
              }}
            />
          </div>
          <div>
            {user.name ? <p>{user.name}</p> : <p>{user.email}</p>}
            {user.userName ? <p>@{user.userName}</p> : null}
            {loggedUser.user._id === user._id ? null : (
              <button onClick={() => handleFollowing()}>
                {following() ? "Unfollow" : "Follow"}
              </button>
            )}
            <div>
              <Link to={`/users/followers/${user._id}`}>Followers</Link>
            </div>
            <div>
              <Link to={`/users/following/${user._id}`}>Following</Link>
            </div>
          </div>
          {user.collections.map((coll) => {
            console.log("e eu?", coll);
            return (
              <div key={uuidv4()}>
                <Link to={`/collection-detail/${coll._id}`}>
                  <p>Collection Name: {coll.collectionName}</p>
                </Link>
                <p>Collection Detail: {coll.collectionDetails}</p>
                {coll.photos.map((photo) => {
                  return (
                    <div key={uuidv4()}>
                      <img
                        src={photo.photoUrl}
                        alt="randomImages"
                        width={100}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default UsersDetailPage;
