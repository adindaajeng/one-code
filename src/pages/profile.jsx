import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [state, setState] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((result) => {
        const { username, email, address, phone } = result.data;
        setState({ username, email, address: address.street, phone });
      });
  }, []);

  return (
    <div className="m-auto col-9 col-md-5">
      <div className="row">
        <div className="col-6">
          <h5 className="my-4">Username</h5>
          <h5 className="my-4">Email</h5>
          <h5 className="my-4">Address</h5>
          <h5 className="my-4">Phone</h5>
        </div>
        <div className="col-6">
          <p className="my-4 text-secondary">: {state.username}</p>
          <p className="my-4 text-secondary">: {state.email}</p>
          <p className="my-4 text-secondary">: {state.address}</p>
          <p className="my-4 text-secondary">: {state.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
