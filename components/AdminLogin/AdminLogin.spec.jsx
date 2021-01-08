import { render } from '@testing-library/react';
import AdminLogin from './AdminLogin';

describe('AdminLogin component', () => {
  const props = {
    submitText: 'Foo',
    gssoUrl: 'http//foo/bar',
  };
  it('should render properly', () => {
    const { asFragment } = render(<AdminLogin {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
