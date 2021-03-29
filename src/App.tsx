import React from "react";
import { Helmet } from "react-helmet";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import maTheme from "./theme";
import { Routes } from "./routes/Routes";

function App() {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | LML" defaultTitle="LML" />
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={maTheme[0]}>
          <ThemeProvider theme={maTheme[0]}>
            <Routes />
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;
