import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          return (
            <div key={user._id}>
              <Link to={`/users/${user._id}`}>
                <div>
                  <img src={user.profilePicture} alt="" width={100} />
                </div>
                {user.userName ? <p>{user.userName}</p> : <p>{user.email}</p>}
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default UsersPage;
