import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { cx } from '../utils';

const Loading = ({ className, style, ...props }) => <CircularProgress
  {...props}
  className={cx('Loading', className)}
  style={style ? style : { 'color': 'var(--gray-light)' }}
/>;

export default Loading;
