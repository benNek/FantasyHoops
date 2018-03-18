import * as React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { isAuth } from '../../utils/auth';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuth()
      ?
      <Component {...props} />
      :
      <Redirect to={{
        pathname: '/login',
        state: { error: 'You must login to proceed!' }
      }}
      />
  )} />
)