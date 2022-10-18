import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import HomePage from "./pages/homePage.js";
import ProfilePage from "./pages/profilePage.js";
import "./App.css";
import SnapNavbar from "./components/SnapNavbar/navbar";
import UsersDetailPage from "./pages/usersDetail";
import CollectionsDetail from "./pages/collectionsDetail";
import FollowersPage from "./pages/followersPage";
import FollowingPage from "./pages/followingPage";
import AllCollections from "./components/AllCollections/allcollections";
import ProtectedRoutes from "./components/ProtectedRoutes/protectedRoute";
import UsersPage from "./pages/usersPage";

function App() {
  return (
    <div className="App">
      <Toaster />
      <AuthContextComponent>
        <SnapNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={<ProtectedRoutes Component={ProfilePage} />}
          />
          <Route
            path="/allCollectionsPage"
            element={<ProtectedRoutes Component={AllCollections} />}
          />
          <Route
            path="/users"
            element={<ProtectedRoutes Component={UsersPage} />}
          />
          <Route
            path="/users/:userId"
            element={<ProtectedRoutes Component={UsersDetailPage} />}
          />
          <Route
            path="/collection-detail/:collectionId"
            element={<ProtectedRoutes Component={CollectionsDetail} />}
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
