import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRef, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import isEmail from "validator/es/lib/isEmail";
import { useHistory } from "react-router-dom";
const ConfirmUser = () => {
  const verificationCode = useRef();

  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const [email, setEmail] = useState(false);

  useEffect(() => {
    const profileParam = new URLSearchParams(window.location.search);
    setEmail(profileParam.get("email"));
  }, [email]);

  const { state, addError, confirmUser } = useContext(AuthContext);

  // console.log("Confirm Signup user", state.user);
  // console.log("Email confirm props", props);

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
            Confirm your Account
          </Typography>
        </Grid>

        <Grid item sx={{ width: 300, mx: 1 }}>
          <TextField
            fullWidth
            inputRef={verificationCode}
            placeholder="Enter confirmation code"
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
              if (verificationCode.current.value.length < 4) {
                addError("Verification code is too short. email:" + email);
                setLoading(false);
                return;
              }

              try {
                if (isEmail(email)) {
                  await confirmUser(email, verificationCode.current.value);
                  history.replace("/");
                }
              } catch (error) {
                console.log(
                  `email ${email} code ${verificationCode.current.value}`
                );
                addError("Error:" + error.message);
              }
              // there was an error  so let the user enter  the verification code again
              setLoading(false);
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ConfirmUser;
