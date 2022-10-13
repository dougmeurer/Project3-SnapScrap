import { useContext } from "react";
import AllCollections from "../components/AllCollections/allcollections";
import { AuthContext } from "../contexts/authContext";
import LoginPage from "./loginPage";
import SignUpPage from "./signUpPage";

function HomePage() {
  const { loggedUser } = useContext(AuthContext);
  return (
    <div>
      {!loggedUser && (
        <div>
          <SignUpPage />

          <LoginPage />
        </div>
      )}
      <AllCollections />
    </div>
  );
}

export default HomePage;
