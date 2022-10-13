import { useContext } from "react";
import AllCollections from "../components/AllCollections/allcollections";
import { AuthContext } from "../contexts/authContext";
import LoginPage from "./loginPage";
import SignUpPage from "./signUpPage";

function HomePage() {
  const { loggedUser } = useContext(AuthContext);
  return (
    <div className="container sm">
      {!loggedUser && (
        <div className="toHome row align-items-center">
          <div className="col align-self-end">
            <SignUpPage />
          </div>
          <div className="col">
            <LoginPage />
          </div>
        </div>
      )}
      <AllCollections />
    </div>
  );
}

export default HomePage;
