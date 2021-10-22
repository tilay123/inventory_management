import React, { useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddItemDialog from "./AddItemDialog";
const HomeScreen = () => {
  const { toggleItemDialog } = useContext(ItemContext);

  // let i = 0;
  // eslint-disable-next-line

  return (
    <>
      <Fab
        variant="extended"
        sx={{ position: "absolute", bottom: 32, right: 32 }}
        onClick={toggleItemDialog}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Item
      </Fab>
      <AddItemDialog></AddItemDialog>
    </>
  );
};

export default HomeScreen;
