import React, { useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ItemContext } from "../context/ItemContext";
import Button from "@mui/material/Button";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "expirationDate",
    label: "Expiration Date",
    minWidth: 80,
    format: (value) => new Date(value).toUTCString(),
  },
  {
    id: "visibility",
    label: "Visibility",
    minWidth: 50,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "description",
    label: "Description",
    minWidth: 200,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function DataTable() {
  // eslint-disable-next-line
  const { state, getAllItems, getPaginatedItems } = useContext(ItemContext);

  useEffect(() => {
    getAllItems();

    // for (const item in state.rowData[0]) {
    //   console.log(`type of ${item} is ${typeof item}`);
    //}
  }, [getAllItems]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /*Documentation: https://mui.com/components/tables/ */

  console.log("Hello from DataTable");
  return (
    <Paper sx={{ height: "100%", mt: 5, mx: 5 }}>
      <Button onClick={getAllItems}>Get All Data</Button>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {state.rowData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {(column.format && typeof value === "number") ||
                          column.id === "expirationDate"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 20, 50]}
        component="div"
        count={state.rowData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
