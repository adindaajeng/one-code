import React from "react";
import { ReactComponent as Bubble } from "../supports/bubble.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Post = ({ userId, title, id }) => {
  const [state, setState] = useState({ username: "", comment: [] });

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((result) => {
        setState((state) => ({ ...state, comment: result.data }));
        axios
          .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
          .then((result) => {
            setState((state) => ({ ...state, username: result.data.username }));
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="row my-3 mx-1">
      <div className="col-3 p-2 ">
        <h5>
          <strong>{state.username}</strong>
        </h5>{" "}
      </div>
      <div className="col-9 p-2 h6 ">
        <p>{title}</p>
        <div>
          <Bubble fill="#0077b6" />
          <strong className="mx-3 txt-color">{state.comment.length}</strong>
          <Link to={`/detail/${id}`} className="mx-5 txt-color">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
