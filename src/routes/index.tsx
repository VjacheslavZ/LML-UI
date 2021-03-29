import React from "react";

import { Users, Layout } from "react-feather";

// Auth components
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";

// Pages components
import { Blank } from "../pages/pages/Blank";

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    }
  ],
  component: null
};

const pagesRoutes = {
  id: "Pages",
  path: "/pages",
  icon: <Layout />,
  children: [
    {
      path: "/pages/home",
      name: "Home",
      component: Blank
    }
  ],
  component: null
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [pagesRoutes];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];
