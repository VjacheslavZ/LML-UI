import React from "react";
import {Route, Redirect} from 'react-router';

// @ts-ignore
export const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = localStorage.getItem('accessToken');

  return (
    <Route {...rest} render={() => {
      return isAuthenticated
        ? children
        : <Redirect to='/auth/sign-in' />
    }} />
  )
}
