import React, { useContext } from 'react';

import { StateContext } from './App';

const Account = () => {
  const { currentUser } = useContext(StateContext);

  return (
    <main className="Account">
      <h1>Account</h1>

      <p><strong>ID:</strong> {currentUser.id}</p>
      <p><strong>Username:</strong> {currentUser.username}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
    </main>
  );
};

export default Account;
