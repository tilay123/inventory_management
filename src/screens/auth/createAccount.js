import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useRef } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
// import awsconfig from "./aws-exports";
// Amplify.configure(awsconfig);
import isEmail from "validator/es/lib/isEmail";

Amplify.configure(awsconfig);
const CreateAccount = () => {
  const email = useRef();
  const password = useRef();
  const password2 = useRef();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username: email.current.value,
        password: password.current.value,
        attributes: {
          email: email.current.value,
        },
      });
      console.log(user);
    } catch (error) {
      //setError("There was an error. Couldn't create the account");
      setError(error.message);
    }
  }

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

        {error && (
          <Grid item>
            <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
              {error}
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
                setError("Passwords do not match");
              } else if (!isEmail(email.current.value)) {
                setError("Enter a valid email address");
              } else {
                await signUp();
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
