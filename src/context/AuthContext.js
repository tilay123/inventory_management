import React, { createContext, useReducer, useCallback } from "react";
import { Auth } from "aws-amplify";

const initialState = { user: null, error: null };

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "sign_in":
      return { ...state, user: action.payload.user, error: null };
    // case "sign_up":
    //   return { ...state, user: action.payload.user, error: null };
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

      console.log("User signed up", user);
      dispatch({ type: "sign_in", payload: { user } });
    } catch (error) {
      //setError("There was an error. Couldn't create the account");
      dispatch({ type: "add_error", payload: { error: error.message } });
      throw error;
    }
  }

  async function signIn(email, password) {
    try {
      const user = await Auth.signIn(email, password);

      console.log("User signed in", user);
      dispatch({ type: "sign_in", payload: { user } });
    } catch (error) {
      console.log("User clicked sign in", error);
      //setError("There was an error. Couldn't create the account");
      dispatch({ type: "add_error", payload: { error: error.message } });
      throw error;
    }
  }

  const loadCurrentUser = useCallback(async () => {
    try {
      let user = await Auth.currentAuthenticatedUser();
      console.log("User signed in", user);
      if (user) {
        dispatch({ type: "sign_in", payload: { user } });
      }
    } catch (error) {
      console.log("User clicked sign in", error);

      dispatch({ type: "add_error", payload: { error: error.message } });
      //throw error;
    }
  }, []);

  const addError = (message) => {
    dispatch({ type: "add_error", payload: { error: message } });
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      dispatch({ type: "sign_out" });
    } catch (error) {
      console.log("error signOut", error.message);
    }
  };

  const confirmUser = async (email, code) => {
    try {
      console.log(`email: ${email} code ${code}`);
      await Auth.confirmSignUp(email, code);
    } catch (error) {
      // dispatch({ type: "add_error", payload: { error: error.message } });
      console.log("error confirmUser", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        signUp,
        signIn,
        addError,
        signOut,
        confirmUser,
        loadCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
