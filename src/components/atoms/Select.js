import React from 'react';

import { cx } from '../../utils';
import './Select.css';


const Select = ({ children, className, ...props }) => (
  <select className={cx('Select', className)} {...props}>
    {children}
  </select>
);

export default Select;
