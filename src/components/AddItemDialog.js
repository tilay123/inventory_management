import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import React, { useContext, useRef, useState } from "react";
import { ItemContext } from "../context/ItemContext";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
//import { AuthContext } from "../context/AuthContext";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AddItemDialog = () => {
  const name = useRef("");
  const description = useRef("");
  const quantity = useRef();
  const [visibility, setVisibility] = useState("Public");
  const [expDate, setExpDate] = React.useState(new Date());
  // const expirationDate = useRef();

  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  const [validation, setValidation] = useState({
    nameIsValid: true,
    descriptionIsValid: true,
    quantityIsValid: true,
    visibilityIsValid: true,
  });

  //fetchCurrentUser

  const { state, toggleItemDialog, saveItem } = useContext(ItemContext);
  // const { state } = useContext(AuthContext);

  //console.log("name.current.value", name.current.value);

  return (
    <div>
      <Dialog
        fullScreen
        open={state.openDialog}
        onClose={toggleItemDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleItemDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Item to Inventory
            </Typography>
            <Button autoFocus color="inherit" onClick={toggleItemDialog}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={1}
          direction="column"
          sx={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            maxWidth: "100%",
          }}
        >
          <Grid item>
            <Typography variant="h3" sx={{ fontWeight: 600 }}>
              Enter Item to Inventory
            </Typography>
          </Grid>

          <Grid item sx={{ width: 300, mx: 1 }}>
            <TextField
              fullWidth
              inputRef={name}
              placeholder="Enter item's name"
              required
              error={!validation.nameIsValid}
              helperText={
                !validation.nameIsValid
                  ? "Name must be at least 2 characters"
                  : ""
              }
            ></TextField>
          </Grid>

          <Grid item sx={{ width: 300, mx: 1 }}>
            <TextField
              fullWidth
              inputRef={description}
              placeholder="Enter item's description"
              error={!validation.descriptionIsValid}
              helperText={
                !validation.descriptionIsValid
                  ? "Description must be at least 5 characters"
                  : ""
              }
              required
            ></TextField>
          </Grid>

          <Grid item sx={{ width: 300, mx: 1 }}>
            <TextField
              fullWidth
              inputRef={quantity}
              type="number"
              InputProps={{ inputProps: { min: 0, max: 99999 } }}
              error={!validation.quantityIsValid}
              helperText={
                !validation.quantityIsValid
                  ? "Quantity must be between 1 and 99999"
                  : ""
              }
              placeholder="Enter item's quantity"
              required
            ></TextField>
          </Grid>

          <Grid item sx={{ width: 300, mx: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Visibility</InputLabel>
              <Select
                labelId="pick_visibility"
                value={visibility}
                label="Visibility mode"
                error={!validation.visibilityIsValid}
                onChange={(event) => setVisibility(event.target.value)}
              >
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item sx={{ width: 300, mx: 1 }}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              {/* npm install date-fns */}
              <DateTimePicker
                label="Expiration Date"
                value={expDate}
                onChange={(newValue) => {
                  setExpDate(newValue);
                }}
                minDate={new Date("2020-01-01")}
                maxDate={new Date("2200-01-01")}
                minTime={new Date(0, 0, 0, 8)}
                maxTime={new Date(0, 0, 0, 18, 45)}
                // helperText="Your error message"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          {state.error && (
            <Grid item>
              <Typography
                color="error"
                variant="body2"
                sx={{ fontWeight: 600 }}
              >
                {state.error}
              </Typography>
            </Grid>
          )}

          <Grid item>
            <Button
              variant="contained"
              sx={{ px: 4 }}
              disabled={loading}
              onClick={async () => {
                setLoading(true);

                setValidation({
                  nameIsValid:
                    //name?.current?.value != null &&
                    name?.current?.value?.trim()?.length > 1,
                  descriptionIsValid:
                    // description?.current?.value != null &&
                    description?.current?.value?.trim()?.length > 4,
                  quantityIsValid:
                    //quantity?.current?.value != null &&
                    quantity?.current?.value > 0 &&
                    quantity?.current?.value < 99999,
                  visibilityIsValid:
                    visibility === "Public" || visibility === "Private",
                });

                if (
                  validation.nameIsValid &&
                  validation.descriptionIsValid &&
                  validation.quantityIsValid &&
                  validation.visibilityIsValid
                ) {
                  await saveItem({
                    name: name.current.value.trim(),
                    description: description.current.value.trim(),
                    quantity: Number(quantity.current.value),
                    visibility,
                    expirationDate: expDate.toISOString(),
                  });
                }

                console.log(`name:${name.current.value}`);

                console.log(`${description.current.value}`);

                console.log(`${quantity.current.value}`);

                console.log(`visibility ${visibility}`);
                console.log(`${expDate.toISOString()}`);

                setLoading(false);
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default AddItemDialog;
