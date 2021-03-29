import React from "react";
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from "react-router-dom";

import AuthLayout from "../layouts/Auth";
import { RouteInfoType } from "../types/types";
import { authLayoutRoutes } from "./index";
import { Page404 } from "../pages/auth/Page404";
import { PrivateRoute } from "../components/PrivateRoute";
import { Home } from "../pages/pages/Home";
import { Profile } from "../pages/pages/Profile";

const childRoutes = (Layout: React.ElementType, routes: Array<RouteInfoType>) =>
  routes.map(({ component: Component, children, path }, index: number) => {
    return children ? (
      children.map((element, index: number) => (
        <Route
          key={index}
          path={element.path}
          exact
          render={(props: RouteComponentProps) => (
            <Layout>
              <element.component {...props} />
            </Layout>
          )}
        />
      ))
    ) : Component ? (
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    ) : null;
  });

export const Routes = () => (
  <Router>
    <Switch>
      {childRoutes(AuthLayout, authLayoutRoutes)}

      <PrivateRoute>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
      </PrivateRoute>

      <Route
        render={() => (
          <AuthLayout>
            <Page404 />
          </AuthLayout>
        )}
      />
    </Switch>
  </Router>
);
