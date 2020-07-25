import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { cx } from '../../utils';
import './Loading.css';

const Loading = ({ className, style, ...props }) => (
  <div className={cx('Loading', className)}>
    <CircularProgress
      {...props}
      style={style ? style : { 'color': 'var(--gray-light)' }}
    />
  </div>
);

export default Loading;
