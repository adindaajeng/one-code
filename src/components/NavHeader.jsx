import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/action/user";

const NavHeader = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  const logOutBtn = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="nav-container">
      <h3>
        <Link to="/dashboard">Cinta Coding</Link>
      </h3>
      {user.username ? (
        <div className="dropdown">
          <h3>
            Welcome,{" "}
            <Link to="/profile" className="username">
              {user.username}
            </Link>
          </h3>
          <div class="dropdown-content">
            <p className="h6 pointer">
              <Link to="/profile">Detail Profile</Link>
            </p>
            <p className="h6 pointer" onClick={logOutBtn}>
              Logout
            </p>
          </div>
        </div>
      ) : (
        <button className="nav-btn">
          <a href="/login">Login</a>
        </button>
      )}
    </div>
  );
};

export default NavHeader;
