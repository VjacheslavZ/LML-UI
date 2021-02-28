import React from "react";
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from "react-router-dom";

import AuthLayout from "../layouts/Auth";
import { RouteInfoType } from "../types/types";
import { dashboardLayoutRoutes, authLayoutRoutes } from "./index";

const childRoutes = (Layout: React.ElementType, routes: Array<RouteInfoType>) =>
  routes.map(({component: Component, children, path}, index: number) =>{
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
    ) : null
  });

export const Routes = () => (
  <Router>
    <Switch>
      {childRoutes(AuthLayout, authLayoutRoutes)}
      <Route
        render={() => (
          <AuthLayout>
            {/*<Page404 />*/}
          </AuthLayout>
        )}
      />
    </Switch>
  </Router>
)
