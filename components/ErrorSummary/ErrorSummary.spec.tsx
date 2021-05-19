import { render } from '@testing-library/react';
import ErrorSummary from './ErrorSummary';

describe('ErrorSummary component', () => {
  const props = {
    title: 'Error Summary',
    body: 'i am an error summary box',
    links: [
      { href: 'foo', text: 'foo' },
      { href: 'bar', text: 'bar' },
    ],
  };

  it('should render properly', () => {
    const { asFragment } = render(<ErrorSummary {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should pass through the role attribute', () => {
    const { getByRole } = render(
      <ErrorSummary {...props} role="complementary" />
    );
    getByRole('complementary');
  });
});
