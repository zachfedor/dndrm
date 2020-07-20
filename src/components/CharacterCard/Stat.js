import React from 'react';

import './Stat.css';

const Stat = (props) => {
  return (
    <div className="Stat" title={props.tooltip}>
      <dt>{ props.label }</dt>
      <dd>{ props.children }</dd>
    </div>
  )
};

export default Stat;
