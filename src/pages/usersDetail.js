import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../contexts/authContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

function UsersDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const { loggedUser } = useContext(AuthContext);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

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
        <div className="profileFlex clearfix">
          <img
            src={user.profilePicture}
            alt=""
            className="profilePicShadow"
            style={{
              height: 200,
              width: 190,
              borderRadius: 100,
            }}
          />
          <div className="profileFlex">
            <h1 className="profileNames">
              {user.name ? <>{user.name}</> : <>{user.email}</>}
            </h1>
            <h6 className="userNames">
              {user.userName ? <>@{user.userName}</> : null}
            </h6>
            {loggedUser.user._id === user._id ? null : (
              <Button
                variant="btn btn-outline-dark btn-sm my-1"
                className="btnContent"
                onClick={() => handleFollowing()}
              >
                {following() ? "Unfollow" : "Follow"}
              </Button>
            )}
            <Button
              variant="btn btn-outline-dark btn-sm my-1"
              className="btnContent"
              onClick={() => {
                navigate(`/users/followers/${user._id}`);
              }}
            >
              Followers
            </Button>
            <Button
              variant="btn btn-outline-dark btn-sm my-1"
              className="btnContent"
              onClick={() => {
                navigate(`/users/following/${user._id}`);
              }}
            >
              Following
            </Button>
          </div>
          <div className="usersCollections">
            <Card>
              {user.collections.map((coll) => {
                return (
                  <Card
                    key={uuidv4()}
                    className="usersCard"
                    onClick={() => {
                      navigate(`/collection-detail/${coll._id}`);
                    }}
                  >
                    <div className="usersContainer">
                      <Card.Header>
                        <Card.Title className="colName">
                          {coll.collectionName}
                        </Card.Title>
                        <Card.Text className="subs">
                          {coll.collectionDetails}
                        </Card.Text>
                      </Card.Header>
                      <Card.Body className="d-flex justify-content-around flex-wrap">
                        {coll.photos.map((photo) => {
                          return (
                            <Image
                              key={uuidv4()}
                              src={photo.photoUrl}
                              alt="randomImages"
                              className="d-flex"
                              fluid
                              style={{
                                padding: 5,
                                borderRadius: 10,
                                width: 230,
                                height: 215,
                                justifyContent: "center",
                              }}
                            />
                          );
                        })}
                      </Card.Body>
                    </div>
                  </Card>
                );
              })}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersDetailPage;
