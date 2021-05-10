import { render } from '@testing-library/react';

import DetailConfirmation from './PersonLinkConfirmation';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: 'foo123456bar' },
  }),
}));

describe('Detail Confirmation component', () => {
  const props = {
    successMessage: 'Done!',
  };

  it('should render properly', () => {
    const { asFragment, getByText } = render(<DetailConfirmation {...props} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(props.successMessage)).toBeInTheDocument();
  });
});
