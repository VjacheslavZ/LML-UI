import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import {
  Avatar,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Typography
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import { MuiButtonSpacingType } from '../../types/types'
import { login, IUser } from "../../actions/auth";


const Button = styled(MuiButton)<MuiButtonSpacingType>(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${props => props.theme.spacing(5)}px;
`;

export const SignIn: React.FC = (props) => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState<IUser>({ password: '', email: ''})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setInputValue({
      ...inputValue,
      [name]: value
    })
  }

  const handleSubmit = async () => {
    const res = await login(inputValue)

    if (res) {
      localStorage.setItem('accessToken', res.accessToken);
      history.push('/')
    }
  }

  return (
    <Wrapper>
      <Helmet title="Sign In" />
      <BigAvatar alt="Lucy" src="/static/img/avatars/avatar-1.jpg" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Welcome back, Lucy!
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Sign in to your account to continue
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          mb={2}
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <Button
          component={Link}
          to="/auth/reset-password"
          fullWidth
          color="primary"
        >
          Forgot password
        </Button>
      </form>
    </Wrapper>
  );
}
