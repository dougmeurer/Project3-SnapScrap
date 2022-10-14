import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { AuthContext } from "../contexts/authContext";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await api.get("/users/all-users");
      setUsers(response.data);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  return (
    <div>
      {!isLoading &&
        users.map((user) => {
          if (loggedUser.user._id === user._id) {
            return null;
          }
          return (
            <div key={user._id} className="profileFlex clearfix ">
              <Link to={`/users/${user._id}`}>
                <img
                  src={user.profilePicture}
                  alt=""
                  style={{
                    height: 200,
                    width: 190,
                    borderRadius: 100,
                  }}
                />
              </Link>
              <div className="profileFlex mx-1 my-1">
                {user.name ? (
                  <h4 className="userNames">{user.name}</h4>
                ) : (
                  <h4 className="userNames">{user.email}</h4>
                )}
                {user.userName ? (
                  <p className="userNames">@{user.userName}</p>
                ) : null}
                <p className="userNames">
                  Collections {user.collections.length}
                </p>
                <p className="userNames">{user.followers.length} Followers </p>
                <p className="userNames">{user.following.length} Following </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default UsersPage;
