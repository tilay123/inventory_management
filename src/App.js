import AppBar from "@mui/material/AppBar";
//import Box from "@mui/material/Box";
import React, { useContext, useEffect } from "react";
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
import { AuthContext } from "./context/AuthContext";
import HomeScreen from "./screens/HomeScreen";
import { Button } from "@mui/material";
import ConfirmUser from "./screens/auth/confirmUser";
function App() {
  const { state, signOut, loadCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppBar position="static" sx={{ margin: 0 }}>
            <Toolbar>
              <Typography variant="h6" component="div">
                User Management App
              </Typography>
              {!!state.user && (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ ml: "auto" }}
                  onClick={signOut}
                >
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </CssBaseline>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {!!state.user ? <HomeScreen /> : <Login />}
            </Route>
            <Route path="/forgot">
              <ForgottenPassword></ForgottenPassword>
            </Route>
            <Route path="/create">
              <CreateAccount></CreateAccount>
            </Route>
            <Route path="/confirm-user">
              <ConfirmUser></ConfirmUser>
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
