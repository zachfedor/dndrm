import React from 'react';

const Error = ({ error, message }) => (
  <main className="Error">
    <h1>{error || "Error"}</h1>

    <p>{message || 'Something went wrong...'}</p>
  </main>
);

export default Error;
