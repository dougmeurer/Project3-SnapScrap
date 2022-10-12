import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import SignUpPage from "./signUpPage";

function HomePage() {
  const { loggedUser } = useContext(AuthContext);
  return (
    <div>
      {!loggedUser}
      <SignUpPage />
    </div>
  );
}

export default HomePage;
