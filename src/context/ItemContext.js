import React, { createContext, useReducer } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Item } from "../models";

const initialState = { openDialog: false };

export const ItemContext = createContext(initialState);

const itemReducer = (state, action) => {
  switch (action.type) {
    case "toggle_dialog":
      return { ...state, openDialog: !state.openDialog };
    // case "sign_up":
    //   return { ...state, user: action.payload.user, error: null };
    case "set_open_dialog":
      return { ...state, openDialog: !state.openDialog };

    default:
      return state;
  }
};

const ItemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemReducer, initialState);

  const toggleItemDialog = () => {
    dispatch({ type: "toggle_dialog" });
  };

  async function saveItem(itemData) {
    try {
      await DataStore.save(new Item(itemData));
      console.log("Item Successfully saved");
    } catch (err) {
      console.log("Error", err.message);
    }
  }

  return (
    <ItemContext.Provider
      value={{
        state,
        toggleItemDialog,
        saveItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
