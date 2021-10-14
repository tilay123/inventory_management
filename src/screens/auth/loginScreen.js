import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRef, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import isEmail from "validator/es/lib/isEmail";
import { useHistory } from "react-router-dom";
const Login = () => {
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);
  //fetchCurrentUser
  const { state, signIn, addError } = useContext(AuthContext);

  let history = useHistory();

  // const { attributes } = state.user;

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
            Login
          </Typography>
        </Grid>

        <Grid item sx={{ width: 300, mx: 1 }}>
          <TextField
            fullWidth
            inputRef={email}
            placeholder="Enter your email"
            required
          ></TextField>
        </Grid>

        <Grid item sx={{ width: 300, mx: 1 }}>
          <TextField
            fullWidth
            inputRef={password}
            placeholder="Enter your password"
            type="password"
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
            variant="contained"
            sx={{ px: 4 }}
            disabled={loading}
            onClick={async () => {
              setLoading(true);

              if (!isEmail(email.current.value)) {
                addError("Enter a valid email");
              } else if (password.current.value.length < 8) {
                addError("Password must be greater than 8 characters");
              } else {
                try {
                  await signIn(email.current.value, password.current.value); // if successful, it will redirect to the main page
                  return; // returning so that setLoading(..) doesn't get called again ||
                } catch (error) {
                  //UserNotConfirmedException
                  if (error.name === "UserNotConfirmedException") {
                    history.replace(
                      `/confirm-user?email=${email.current.value}`
                    );

                    return;
                  }
                  // If error: we need to call setLoading(false) so that user can submit again.
                  setLoading(false);
                }
              }

              setLoading(false);
            }}
          >
            Sign In
          </Button>
        </Grid>

        <Grid item>
          <Typography
            component="a"
            href="/forgot"
            color="secondary"
            variant="body2"
            sx={{ fontWeight: 600 }}
          >
            Forgot Password?
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            component="a"
            href="/create"
            color="secondary"
            variant="body2"
            sx={{ fontWeight: 600 }}
          >
            Create a new account
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
