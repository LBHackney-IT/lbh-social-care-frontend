import { fireEvent, render, screen } from '@testing-library/react';

import DetailConfirmation from './PersonLinkConfirmation';
import Router from 'next/router';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: 'foo123456bar' },
  }),
  push: jest.fn(),
}));

describe('Detail Confirmation component', () => {
  const props = {
    successMessage: 'Done!',
  };

  it('should render properly', () => {
    const { asFragment, getByText } = render(<DetailConfirmation {...props} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(props.successMessage)).toBeInTheDocument();
    fireEvent.click(screen.getByText('View person'));

    expect(Router.push).toHaveBeenCalledWith('/residents/foo123456bar');
  });
});
