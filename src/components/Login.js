import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';

import { DispatchContext } from './App';
import api from '../api';
import { Button } from './atoms';
import { LOGIN } from '../constants/actionTypes';
import { LabeledInput } from './molecules';
import './Login.css';

const Login = (props) => {
  const dispatch = useContext(DispatchContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState();
  const [error, setError] = useState();

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormState('loading');

    api.post('auth/login', { username, password })
      .then(json => {
        if (json.user) {
          api.setToken(json.user.token);
          dispatch({
            type: LOGIN,
            user: json.user,
          });
          if (error) setError(null);
        } else {
          setError(json.error);
        }
        setFormState('done');
      });
  };

  if (formState === 'done' && !error) {
    const { from } = props.location.state || { from: { pathname: '/' }};
    return <Redirect to={from} />;
  }

  return (
    <main className="Login">
      <h1>Login</h1>

      <form className="Login_form" onSubmit={handleSubmit}>
        <LabeledInput
          type="text"
          autoFocus={true}
          id="username"
          value={username}
          onChange={handleChange(setUsername)}
        />
        <LabeledInput
          type="password"
          id="password"
          value={password}
          onChange={handleChange(setPassword)}
        />

        <div>
          <Button
            type="submit"
            disabled={formState === 'loading'}
          >
            Login
          </Button>

          {(error && formState !== 'loading') && (
            <p className="Login_error">{error}</p>
          )}
        </div>
      </form>
    </main>
  );
};

export default Login;
