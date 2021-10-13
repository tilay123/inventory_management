import AppBar from "@mui/material/AppBar";
//import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
//import Paper from "@mui/material/Paper";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./screens/auth/loginScreen";
import ForgottenPassword from "./screens/auth/forgottenPassword";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import CreateAccount from "./screens/auth/createAccount";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
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
            <Route path="/create">
              <CreateAccount></CreateAccount>
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
