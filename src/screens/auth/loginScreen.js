import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const Login = () => {
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
            placeholder="Enter your email"
            required
          ></TextField>
        </Grid>

        <Grid item sx={{ width: 300, mx: 1 }}>
          <TextField
            fullWidth
            placeholder="Enter your password"
            type="password"
            required
          ></TextField>
        </Grid>

        <Grid item>
          <Button variant="contained" sx={{ px: 4 }}>
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
