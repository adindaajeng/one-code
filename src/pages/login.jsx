import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/action/user";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const loginBtn = () => {
    dispatch(loginUser(state.username, state.password));
  };

  const userLoginData = useSelector((state) => {
    return state.user;
  });

  const userId = localStorage.getItem("userId");
  if (userId) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="m-auto col-8 col-md-4 d-flex flex-column align-items-center">
      <h2 className="my-5">Login Page</h2>
      {userLoginData.message && (
        <div className="alert alert-danger">{userLoginData.message}</div>
      )}
      <input
        type="text"
        placeholder="username"
        name="username"
        className="form-input"
        onChange={inputHandler}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        className="form-input"
        onChange={inputHandler}
      />
      <button className="my-4 btn-submit" onClick={loginBtn}>
        Login
      </button>
    </div>
  );
};

export default Login;
