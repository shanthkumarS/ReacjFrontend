import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Home } from "./Components/Pages/Home";
import { CreateUser } from "./Components/Forms/CreateUser";
import LoginUser from "./Components/Forms/LoginUser";
import EditUser from "./Components/Forms/EditUser";

function App(props) {
  const navigate = useNavigate();
  const [authorization, setAuthorization] = useState(
    localStorage.getItem("Authorization")
  );
  const userLoggedIn = () => {
    setAuthorization(localStorage.getItem("Authorization"));
  };

  useEffect(() => {
    setAuthorization(localStorage.getItem("Authorization"));
  }, []);

  const logOut = () => {
    localStorage.removeItem('Authorization');
    window.location.href = '/login';
  } 

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          {!authorization ? (
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to onClick={logOut} className="nav-link">
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/create"} className="nav-link">
                  Create
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              authorization ? <Home /> : <LoginUser onLogin={userLoggedIn} />
            }
          ></Route>
          <Route
            path="/login"
            element={
              authorization ? <Home /> : <LoginUser onLogin={userLoggedIn} />
            }
          ></Route>
          <Route
            path="/create"
            element={
              authorization ? (
                <CreateUser />
              ) : (
                <LoginUser onLogin={userLoggedIn} />
              )
            }
          ></Route>
          <Route
            path="/user/edit"
            element={
              authorization ? (
                <EditUser />
              ) : (
                <LoginUser onLogin={userLoggedIn} />
              )
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
