import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { StateContext } from './App';
import { Loading } from './atoms';

const AuthRoute = ({ component: Component, user, ...rest }) => {
  const state = useContext(StateContext);
  const isLoading = state.loading.includes('LOGIN');
  const isAuthenticated = !!state.currentUser;

  return (
    <Route {...rest} render={(props) => {
      if (isLoading) {
        return (
          <Loading />
        );
      }

      if (isAuthenticated) {
        return (
          <Component {...props} />
        );
      }

      return (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      );
    }} />
  );
};

export default AuthRoute;
