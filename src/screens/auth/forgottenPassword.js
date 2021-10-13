import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const ForgottenPassword = () => {
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
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Reset Password
          </Typography>
        </Grid>

        <Grid item sx={{ width: 300, mx: 1 }}>
          <TextField
            fullWidth
            placeholder="Enter your email"
            required
          ></TextField>
        </Grid>

        <Grid item>
          <Button variant="contained" sx={{ px: 4 }}>
            Reset
          </Button>
        </Grid>

        <Grid item>
          <Typography
            component="a"
            href="/"
            variant="body2"
            color="secondary"
            sx={{ fontWeight: 600 }}
          >
            Sign in
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgottenPassword;
