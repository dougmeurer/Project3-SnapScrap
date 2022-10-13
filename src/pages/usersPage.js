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
            <div key={user._id}>
              <Link to={`/users/${user._id}`}>
                <div>
                  <img
                    src={user.profilePicture}
                    alt=""
                    style={{
                      height: 200,
                      width: 190,
                      borderRadius: 20,
                    }}
                  />
                </div>
              </Link>
              {user.userName ? <p>{user.userName}</p> : <p>{user.email}</p>}
              <p>Collections {user.collections.length}</p>
              <p>Followers {user.followers.length}</p>
              <p>Following {user.following.length}</p>
            </div>
          );
        })}
    </div>
  );
}

export default UsersPage;
