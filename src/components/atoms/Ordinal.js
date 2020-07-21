import React from 'react';

const Ordinal = ({ num, ...props }) => {
  const x = num % 10; // get number in one's place
  const y = num % 100; // check for teens exception (11, 12, and 13)

  let suffix = 'th';
  if (x === 1 && y !== 11) suffix = 'st';
  else if (x === 2 && y !== 12) suffix = 'nd';
  else if (x === 3 && y !== 13) suffix = 'rd';

  return <span {...props}>{num}<sup>{suffix}</sup></span>;
};

export default Ordinal;
