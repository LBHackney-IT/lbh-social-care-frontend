import { render } from '@testing-library/react';
import LinkButton from './LinkButton';

describe('LinkButton component', () => {
  const props = {
    label: 'Foo',
    route: 'https://foo/bar',
    internalQuery: '?foo',
  };
  it('should render properly', () => {
    const { asFragment } = render(<LinkButton {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
