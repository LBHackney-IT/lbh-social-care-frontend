import React from 'react';

const sizes = {
  xl: 'govuk-heading-xl',
  l: 'govuk-heading-l',
  m: 'govuk-heading-m',
  s: 'govuk-heading-s'
};

const defaults = {
  h1: 'xl',
  h2: 'l',
  h3: 'm',
  h4: 's'
};

const Heading = ({ as, size, children }) => {
  return React.createElement(
    as,
    {
      className: sizes[size || defaults[as]]
    },
    children
  );
};

export default Heading;
