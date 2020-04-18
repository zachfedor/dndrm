import React from 'react';

import './Button.css';

const Button = ({children, ...props}) => {
  return (
    <button {...props} className={'Button ' + props.className} >
      {children}
    </button>
  );
};

export default Button;
