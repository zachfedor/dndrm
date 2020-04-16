import React from 'react';

import './Stat.css';

const Stat = (props) => {
  const sign = !props.sign ? '' : (props.value > 0 ? '+' : '');
  const unit = props.unit || '';
  const value = `${sign}${props.value}${unit}`;
  
  return (
    <div className="Stat" title={props.tooltip}>
      <dt>{ props.label }</dt>
      <dd>{ value }</dd>
    </div>
  )
};

export default Stat;
