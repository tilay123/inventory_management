import React, { createContext, useReducer, useCallback } from "react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Item, Visibility } from "../models";

const initialState = { openDialog: false, rowData: [] };

export const ItemContext = createContext(initialState);

const itemReducer = (state, action) => {
  switch (action.type) {
    case "toggle_dialog":
      return { ...state, openDialog: !state.openDialog };
    // case "sign_up":
    //   return { ...state, user: action.payload.user, error: null };
    case "add_table_row_data":
      return { ...state, rowData: action.payload.rowData };

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
      await DataStore.save(
        new Item({
          ...itemData,
          visibility:
            itemData.visibility.toLowerCase() === "public"
              ? Visibility.PUBLIC
              : Visibility.PRIVATE,
        })
      );
      console.log("Item Successfully saved");
    } catch (err) {
      console.log("Error", err.message);
    }
  }

  const getAllItems = useCallback(async () => {
    try {
      const data = await DataStore.query(Item);
      console.log("getAllItems", data);
      dispatch({ type: "add_table_row_data", payload: { rowData: data } });
      //return data;
    } catch (err) {
      console.log("Query Failed", err.message);
    }
  }, []);

  async function getPaginatedItems(page, limit) {
    try {
      const data = await DataStore.query(Item, Predicates.ALL, { page, limit });
      console.log("getPaginatedItems", data);
      //return data;
    } catch (err) {
      console.log("Query Failed", err.message);
    }
  }

  return (
    <ItemContext.Provider
      value={{
        state,
        toggleItemDialog,
        saveItem,
        getAllItems,
        getPaginatedItems,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
