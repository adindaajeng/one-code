import axios from "axios";

export const loginUser = (username, password) => {
  console.log("action login");
  return (dispatch) => {
    if (username !== password) {
      dispatch({
        type: "USER_LOGIN_ERROR",
        payload: "Wrong username or password",
      });
    } else {
      axios
        .get(`https://jsonplaceholder.typicode.com/users`, {
          params: { username },
        })
        .then((result) => {
          if (result.data.length) {
            localStorage.setItem("userId", result.data[0].id);
            dispatch({
              type: "USER_LOGIN",
              payload: result.data[0].username,
            });
          } else {
            dispatch({
              type: "USER_LOGIN_ERROR",
              payload: "Sorry, we couldn't find your account",
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: "USER_LOGIN_ERROR",
            payload: "Sorry, we couldn't find your account",
          });
        });
    }
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: "USER_LOGOUT" });
};

export const userKeepLogin = (id) => {
  return (dispatch) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((result) => {
        dispatch({
          type: "USER_LOGIN",
          payload: result.data.username,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
