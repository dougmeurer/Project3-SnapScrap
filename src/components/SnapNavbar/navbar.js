import { useNavigate } from "react-router-dom";

function SnapNavbar() {
  const navigate = useNavigate();

  function handleLogOut(e) {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  }

  return (
    <>
      <button onClick={handleLogOut}>Sair</button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        home
      </button>
      <button
        onClick={() => {
          navigate("/users");
        }}
      >
        All Users
      </button>
      <button
        onClick={() => {
          navigate("/profile");
        }}  
      >
        Profile
      </button>

      <button
        onClick={() => {
          navigate("/allCollections");
        }}
      >
        All Collections - not set yet
      </button>
    </>
  );
}

export default SnapNavbar;
