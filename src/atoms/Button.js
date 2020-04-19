import React from 'react';

import { cx } from '../utils';
import './Button.css';

const Button = ({children, className, ...props}) => {
  return (
    <button {...props} className={cx('Button', className)} >
      {children}
    </button>
  );
};

export default Button;
