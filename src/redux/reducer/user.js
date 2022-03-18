const init_state = {
  username: "",
  message: "",
  storageIsChecked: false,
};

const user = (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, username: action.payload };
    case "USER_LOGIN_ERROR":
      return { ...state, message: action.payload };
    case "USER_LOGOUT":
      return { ...init_state, storageIsChecked: true };
    default:
      return state;
  }
};

export default user;
