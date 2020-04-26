import React from 'react';

import { CheckCircle } from '../atoms';
import './LabeledCheckCircle.css';


const LabeledCheckCircle = ({ id, label, ...props }) => {
  return (
    <label className="LabeledCheckCircle" htmlFor={id}>
      <CheckCircle {...props} id={id} />
      <span>{label}</span>
    </label>
  );
};

export default LabeledCheckCircle;
