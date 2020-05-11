import React from 'react';

import { CheckCircle } from '../atoms';
import './CheckCircleArray.css';


const CheckCircleArray = ({ values, label = null, handleClick, ...props }) => {
  const createHandler = (index) => () => {
    handleClick(values.map((v, i) => i === index ? !v : v).sort().reverse());
  };

  return (
    <div className="CheckCircleArray">
      {label && <label>{label}</label>}

      {values.map((value, index) => (
        <CheckCircle {...props} key={index} checked={value} handleClick={createHandler(index)} />
      ))}
    </div>
  );
};

export default CheckCircleArray;
