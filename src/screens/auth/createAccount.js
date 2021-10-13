import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import isEmail from "validator/es/lib/isEmail";

const CreateAccount = () => {
  const email = useRef();
  const password = useRef();
  const password2 = useRef();

  const { state, signUp, addError } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  return (
    <>
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
            Create a new account
          </Typography>
        </Grid>

        <Grid item sx={{ width: 300, mx: 1 }}>
          <TextField
            fullWidth
            placeholder="Enter your email"
            type="email"
            required
            inputRef={email}
          ></TextField>
        </Grid>

        <Grid item sx={{ width: 300, mx: 1 }}>
          <TextField
            fullWidth
            placeholder="Enter a new password"
            type="password"
            inputRef={password}
            required
          ></TextField>
        </Grid>
        <Grid item sx={{ width: 300, mx: 1 }}>
          <TextField
            fullWidth
            placeholder="Enter the new password again"
            type="password"
            inputRef={password2}
            required
          ></TextField>
        </Grid>

        {state.error && (
          <Grid item>
            <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
              {state.error}
            </Typography>
          </Grid>
        )}

        <Grid item>
          <Button
            disabled={loading}
            variant="contained"
            sx={{ px: 4 }}
            onClick={async () => {
              // console.log(
              //   `email:${email.current.value} pass:${password.current.value} pass2:${password2.current.value}`
              // )
              setLoading(true);
              if (password.current.value !== password2.current.value) {
                addError("Passwords do not match");
              } else if (!isEmail(email.current.value)) {
                addError("Enter a valid email address");
              } else {
                await signUp(email.current.value, password.current.value);
              }
              setLoading(false);
            }}
          >
            Sign Up
          </Button>
        </Grid>

        <Grid item>
          <Typography
            component="a"
            href="/"
            color="secondary"
            variant="body2"
            sx={{ fontWeight: 600 }}
          >
            Log In
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateAccount;
