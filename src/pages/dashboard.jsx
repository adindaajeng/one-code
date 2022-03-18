import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import Post from "../components/post";

const Dashboard = () => {
  const [state, setState] = useState({
    postList: [],
    itemPerPage: 10,
    currPage: 1,
    maxPage: 0,
  });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((result) => {
        setState((state) => ({
          ...state,
          postList: result.data,
          maxPage: Math.ceil(result.data.length / state.itemPerPage),
        }));
      })
      .catch((err) => {
        alert("There was an error with the server");
      });
  }, []);

  const renderPost = () => {
    if (state.postList.length) {
      const beginningIndex = (state.currPage - 1) * state.itemPerPage;
      let rawData = state.postList;
      let currentData = rawData.slice(
        beginningIndex,
        state.itemPerPage + beginningIndex
      );

      return currentData.map((data) => {
        return <Post id={data.id} title={data.title} userId={data.userId} />;
      });
    }
  };

  const pageBtnHandler = (type) => {
    if (type === "previous" && state.currPage > 1) {
      setState({ ...state, currPage: state.currPage - 1 });
    }
    if (type === "next" && state.currPage < state.maxPage) {
      setState({ ...state, currPage: state.currPage + 1 });
    }
  };

  return (
    <div className="m-auto col-9 col-md-5 ">
      <input type="text" placeholder="Search" className="search-input" />
      <img
        src="https://cdn.icon-icons.com/icons2/2551/PNG/512/search_icon_152764.png"
        className="icon"
        alt=""
      />

      {renderPost()}
      <div className="d-flex justify-content-end h6 mb-5 mt-2">
        <button
          className="mx-3 btn-page h6"
          onClick={() => {
            pageBtnHandler("previous");
          }}
        >
          {"<"}
        </button>
        <span>
          Page {state.currPage} of {state.maxPage}
        </span>

        <button
          className="mx-3 btn-page h6"
          onClick={() => {
            pageBtnHandler("next");
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

// axios
//   .get(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
//   .then((result1) => {
//     axios
//       .get(`https://jsonplaceholder.typicode.com/posts/${data.id}/comments`)
//       .then((result2) => {
//         data.username = result1.data.username;
//         data.comment = result2.data;
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
