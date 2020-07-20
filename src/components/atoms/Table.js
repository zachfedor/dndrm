import React from 'react';

import { cx } from '../../utils';
import './Table.css';


const Table = ({ children, className, ...props }) => (
  <table {...props} className={cx('Table', className)}>
    {children}
  </table>
);

export default Table;
