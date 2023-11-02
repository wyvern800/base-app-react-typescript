/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Repository from './pages/Repository';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuthenticate = localStorage.getItem('auth_token');
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticate ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repository" component={Repository} />
  </Switch>
);

export const PrivateRoutes = ({ userData }: any): any => (
  <>
    {userData.role === 'admin' && (
      <>
        <PrivateRoute exact path="/admin" component={<>admin</>} />
      </>
    )}

    <PrivateRoute exact path="/profile" component={<>profile</>} />
  </>
);

export default Routes;
