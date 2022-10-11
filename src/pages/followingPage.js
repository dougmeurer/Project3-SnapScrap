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
        console.log("1", response.data);
      } else {
        response = await api.get("/users/profile");
        console.log("2", response.data);
      }
      setUser(response.data);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  console.log("quem?", user);

  return (
    <div>
      {!isLoading && (
        <>
          {user.following.map((following) => {
            console.log("????", following);
            return (
              <div key={uuidv4()}>
                <Link to={`/users/${following._id}`}>
                  <img
                    src={following.profilePicture}
                    alt="profPic"
                    width={50}
                  />
                </Link>
                {following.followers ? (
                  <div>
                    <span>Followed by {following.followers.length} people</span>
                  </div>
                ) : null}
                {following.following ? (
                  <div>
                    <span>Following {following.following.length} people</span>
                  </div>
                ) : null}
                {following.name ? (
                  <p>Name: {following.name}</p>
                ) : (
                  <p>Email: {following.email}</p>
                )}
                {following.userName ? <p>@{following.userName}</p> : null}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default FollowingPage;
