import { render } from '@testing-library/react';

import ErrorMessage from './ErrorMessage';

describe('ErrorMessage component', () => {
  it('should render properly', () => {
    const { asFragment } = render(<ErrorMessage label="I am an error" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly with the default message', () => {
    const { asFragment } = render(<ErrorMessage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
