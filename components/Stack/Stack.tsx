import React from 'react';
import cx from 'classnames';

export interface Props {
  children: React.ReactElement | React.ReactElement[];
  /** reference: https://design-system.service.gov.uk/styles/spacing/ */
  space: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  className?: string;
}

const Stack = ({ children, space, className }: Props): React.ReactElement => (
  <div className={className}>
    {React.Children.map(children, (child, key) => (
      <div
        key={key}
        className={cx({ [`govuk-!-margin-top-${space}`]: key !== 0 })}
      >
        {child}
      </div>
    ))}
  </div>
);

export default Stack;
