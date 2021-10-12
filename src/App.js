import AppBar from "@mui/material/AppBar";
//import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
//import Paper from "@mui/material/Paper";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./screens/loginScreen";
import ForgottenPassword from "./screens/forgottenPassword";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppBar position="static" sx={{ margin: 0 }}>
            <Toolbar>
              <Typography variant="h6" component="div">
                User Management App
              </Typography>
            </Toolbar>
          </AppBar>
        </CssBaseline>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <Route path="/forgot">
              <ForgottenPassword></ForgottenPassword>
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;