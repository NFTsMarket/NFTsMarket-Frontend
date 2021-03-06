import { useReducer, useEffect } from "react";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return initialState;

    case "UPDATE_PICTURE":
      const updatedUser = {
        ...state.user,
        profilePicture: action.payload.profilePicture,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
      };

    default:
      return state;
  }
};

export function useProviderAuth() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      dispatch({
        type: "LOGIN",
        payload: {
          token: localStorage.getItem("token"),
          user: JSON.parse(localStorage.getItem("user")),
        },
      });
    }
  }, []);

  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    token: state.token,
    dispatch,
  };
}
