import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Bubble } from "../supports/bubble.svg";

const Detail = () => {
  const [state, setState] = useState({
    username: "",
    title: "",
    body: "",
    comment: [],
    commentLength: 0,
  });

  const params = useParams();

  const fetchPost = async () => {
    let post = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    let username = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${post.data.userId}`
    );
    let comment = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`
    );
    setState({
      username: username.data.username,
      title: post.data.title,
      body: post.data.body,
      commentLength: comment.data.length,
      comment: [],
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const btnComment = async () => {
    let comment = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`
    );
    setState((state) => ({ ...state, comment: comment.data }));
  };

  const renderComment = () => {
    return state.comment.map((data) => {
      return (
        <div className="row my-4">
          <div className="col-4">
            <strong className="h6">{data.email.split("@")[0]}</strong>
          </div>
          <div className="col-8 text-secondary">{data.body}</div>
        </div>
      );
    });
  };

  return (
    <div className="m-auto col-9 col-md-5">
      <div className="row my-3 mx-1">
        <div className="col-3 p-2 ">
          <h5>
            <strong className="align-self-center">{state.username}</strong>
          </h5>{" "}
        </div>
        <div className="col-9 p-2 h6 ">
          <strong className="h6">{state.title}</strong>
          <p className="my-3 text-secondary">{state.body.repeat(2)}</p>
          <div className="my-3">
            {state.comment.length ? (
              <div>
                <strong className="txt-color" onClick={btnComment}>
                  All Comments
                </strong>
                {renderComment()}
              </div>
            ) : (
              <div onClick={btnComment} className="pointer">
                <Bubble fill="#0077b6" />
                <strong className="mx-3 txt-color">
                  {state.commentLength}
                </strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
