import React, { createContext, useReducer } from "react";

const initialState = { user: null };

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "sign_in":
      return { ...state, user: action.payload.user };
    case "sign_up":
      return { ...state, user: action.payload.user };
    case "sign_out":
      return { ...state, user: null };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
