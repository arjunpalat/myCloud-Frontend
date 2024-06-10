import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ImageViewer from "./pages/ImageViewer";

const App = () => {
  const [user, setUser] = useState(function () {
    const user = localStorage.getItem("myDriveUser");
    return JSON.parse(user) ? true : false;
  });

  const handleLogin = (data) => {
    setUser(true);
    localStorage.setItem("myDriveUser", JSON.stringify(data));
  };

  const handleLogout = () => {
    setUser(false);
    localStorage.removeItem("myDriveUser");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !user ? (
              <Login handleLogin={handleLogin} />
            ) : (
              <Navigate to="/folders/home" />
            )
          }
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/folders/home" />}
        />
        <Route
          exact
          path="/"
          element={<Navigate to={user ? "/folders/home" : "/login"} />}
        />
        <Route
          path="/folders/:folderUUId"
          element={
            user ? (
              <Dashboard handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/files/:fileUUId"
          element={user ? <ImageViewer /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
