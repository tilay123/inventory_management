import React, { createContext, useReducer } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

const initialState = { user: null, error: null };

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "sign_in":
      return { ...state, user: action.payload.user, error: null };
    case "sign_up":
      return { ...state, user: action.payload.user, error: null };
    case "sign_out":
      return { ...state, user: null };
    case "add_error":
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  async function signUp(email, password) {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email: email,
        },
      });

      console.log(user);
      dispatch({ type: "add_error", payload: { user } });
    } catch (error) {
      //setError("There was an error. Couldn't create the account");
      dispatch({ type: "add_error", payload: { error: error.message } });
    }
  }

  const addError = (message) => {
    dispatch({ type: "add_error", payload: { error: message } });
  };

  return (
    <AuthContext.Provider value={{ state, signUp, addError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
