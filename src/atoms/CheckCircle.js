import React from 'react';

import { cx } from '../utils';
import './CheckCircle.css';


const CheckCircle = ({ checked, handleClick, ...props }) => {
  const onClick = () => handleClick(!checked);

  return (
    <div className={cx('CheckCircle', checked && 'checked')}>
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
