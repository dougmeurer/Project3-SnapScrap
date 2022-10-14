import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import HomePage from "./pages/homePage.js";
import ProfilePage from "./pages/profilePage.js";
import "./App.css";
import SnapNavbar from "./components/SnapNavbar/navbar";
import UsersDetailPage from "./pages/usersDetail";
import CollectionsDetail from "./pages/collectionsDetail";
import UsersPage from "./pages/usersPage";
import FollowersPage from "./pages/followersPage";
import FollowingPage from "./pages/followingPage";
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <div className="App">
      <Toaster />
      <AuthContextComponent>
        <SnapNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:userId" element={<UsersDetailPage />} />
          <Route
            path="/collection-detail/:collectionId"
            element={<CollectionsDetail />}
          />
          <Route path="/users/followers" element={<FollowersPage />} />
          <Route path="/users/followers/:userId" element={<FollowersPage />} />
          <Route path="/users/following" element={<FollowingPage />} />
          <Route path="/users/following/:userId" element={<FollowingPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
