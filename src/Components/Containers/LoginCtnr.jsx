import { useTheme } from "@material-ui/core";
import React from "react";
import LoginForm from "../../Screens/Login";
import SlideShow from "./SlideShow";
import { LoginStyles } from "../../Assets/css/styles";

const LoginCtnr = () => {
  const theme = useTheme();
  return (
    <LoginStyles theme={theme}>
      <SlideShow />
      <LoginForm />
    </LoginStyles>
  );
};

export default LoginCtnr;
