import React from 'react';

import { cx } from '../utils';
import Input from './Input';
import './LabeledInput.css';

const LabeledInput = ({ className, label, ...props }) => (
  <div className={cx('LabeledInput', className)}>
    <label htmlFor={props.id}>{label ? label : props.id}</label>
    <Input {...props} />
  </div>
);

export default LabeledInput;
