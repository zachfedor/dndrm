import React from 'react';

import { cx } from '../utils';
import './CheckCircle.css';


const CheckCircle = ({ checked, color, handleClick, ...props }) => {
  const onClick = () => handleClick(!checked);

  return (
    <div className={cx('CheckCircle', checked && 'checked', color)}>
      <input
        {...props}
        type="checkbox"
        checked={checked || false}
        onChange={onClick}
      />
      <div onClick={onClick}></div>
    </div>
  );
};

export default CheckCircle;
