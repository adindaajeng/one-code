import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { userKeepLogin } from "./redux/action/user";

import "bootstrap/dist/css/bootstrap.css";
import "./supports/main.css";

import Home from "./pages/home";
import Login from "./pages/login";
import NavHeader from "./components/NavHeader";
import Dashboard from "./pages/dashboard";
import Detail from "./pages/detail";
import Profile from "./pages/profile";

function App() {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userKeepLogin(userId));
  }, []);

  return (
    <BrowserRouter>
      <NavHeader />
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Detail />} path="/detail/:id" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<Home />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
