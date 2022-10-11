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
        console.log("no 1", response.data);
      } else {
        response = await api.get("/users/profile");
        console.log("no 2", response.data);
      }
      setUser(response.data);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  console.log("aqui", user.followers);

  return (
    <div>
      {!isLoading && (
        <>
          {user.followers.map((follower) => {
            console.log("seguidor", follower);
            return (
              <div key={uuidv4()}>
                <Link to={`/users/${follower._id}`}>
                  <img src={follower.profilePicture} alt="profPic" width={50} />
                </Link>
                {follower.followers ? (
                  <div>
                    <span>Followed by {follower.followers.length} people</span>
                  </div>
                ) : null}
                {follower.following ? (
                  <div>
                    <span>Following {follower.following.length} people</span>
                  </div>
                ) : null}
                {follower.name ? (
                  <p>Name: {follower.name}</p>
                ) : (
                  <p>Email: {follower.email}</p>
                )}
                {follower.userName ? <p>@{follower.userName}</p> : null}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default FollowersPage;
