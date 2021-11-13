import React, { useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddItemDialog from "../components/AddItemDialog";
import DataTable from "../components/DataTable";
import Box from "@mui/material/Box";
const HomeScreen = () => {
  const { toggleItemDialog } = useContext(ItemContext);

  // let i = 0;
  // eslint-disable-next-line

  return (
    <>
      <DataTable></DataTable>
      <Fab
        variant="extended"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        onClick={toggleItemDialog}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Item
      </Fab>
      <AddItemDialog></AddItemDialog>
      <Box sx={{ height: 100 }}></Box>
    </>
  );
};

export default HomeScreen;
