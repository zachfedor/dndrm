import React from 'react';

import './StatList.css';

const StatList = (props) => (
  <dl className="StatList">
    {props.children}
  </dl>
);

export default StatList;
