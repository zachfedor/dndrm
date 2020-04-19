import React from 'react';

import { cx } from '../utils';
import './Input.css';

const Input = ({ className, ...props }) => {
  return (
    <input {...props} className={cx('Input', className)} />
  );
};

export default Input;
