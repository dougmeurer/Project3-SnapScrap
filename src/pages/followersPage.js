import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/api";
import { v4 as uuidv4 } from "uuid";

export function FollowersPage() {
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
        user.followers.map((follower) => {
          return (
            <div key={uuidv4()} className="profileFlex clearfix ">
              <Link to={`/users/${follower._id}`}>
                <img
                  src={follower.profilePicture}
                  alt="profPic"
                  style={{
                    height: 200,
                    width: 190,
                    borderRadius: 100,
                  }}
                />
              </Link>
              <div className="profileFlex mx-1 my-1">
                {follower.name ? (
                  <h4 className="userNames">{follower.name}</h4>
                ) : (
                  <h4 className="userNames">{follower.email}</h4>
                )}
                {follower.userName ? (
                  <p className="userNames">@{follower.userName}</p>
                ) : null}
                <p className="userNames">
                  {follower.collections.length} Collections
                </p>
                <p className="userNames">
                  {follower.followers.length} Followers{" "}
                </p>
                <p className="userNames">
                  Following {follower.following.length}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default FollowersPage;
