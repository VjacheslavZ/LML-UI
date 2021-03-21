import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router';

import { MuiButtonSpacingType } from './../../types/types'
import { IUser } from '../../actions/auth'
import {
  FormControl,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Typography
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { signup } from "../../actions/auth";

const Button = styled(MuiButton)<MuiButtonSpacingType>(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

export const SignUp = () => {
  const history = useHistory()
  const [signUpData, setSignUpData] = useState<IUser>({
    password: '',
    email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignUpData({
      ...signUpData,
      [name]: value,
    })
  };

  const handleSubmit = () => {
    signup(signUpData)
      .then(() => {
        history.push('/auth/sign-in')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Wrapper>
      <Helmet title="Sign Up" />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Get started
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Start creating the best possible user experience for you customers
      </Typography>
      <form>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          mt={2}
          onClick={handleSubmit}
        >
          Sign up
        </Button>
      </form>
    </Wrapper>
  );
}
