import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/api";
import { v4 as uuidv4 } from "uuid";

export function FollowingPage() {
  const [user, setUser] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      let response = null;
      if (userId) {
        response = await api.get(`/users/user/${userId}`);
      } else {
        response = await api.get("/users/profile");
      }
      setUser(response.data);
      setIsLoading(false);
    }

    fetchUser();
  }, []);


  return (
    <div>
      {!isLoading &&
        user.following.map((following) => {
          return (
            <div key={uuidv4()} className="profileFlex clearfix ">
              <Link to={`/users/${following._id}`}>
                <img
                  src={following.profilePicture}
                  alt="profPic"
                  style={{
                    height: 200,
                    width: 190,
                    borderRadius: 100,
                  }}
                />
              </Link>
              <div className="profileFlex mx-1 my-1">
                {following.name ? (
                  <h4 className="userNames">{following.name}</h4>
                ) : (
                  <h4 className="userNames">{following.email}</h4>
                )}
                {following.userName ? (
                  <p className="userNames">@{following.userName}</p>
                ) : null}
                <p className="userNames">
                  {following.collections.length} Collections
                </p>
                <p className="userNames">
                  {following.followers.length} Followers{" "}
                </p>
                <p className="userNames">
                  Following {following.following.length}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default FollowingPage;
