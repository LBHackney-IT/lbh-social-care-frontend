import { render } from '@testing-library/react';

import SummaryList from './SummaryList';

describe('SummaryList component', () => {
  const props = {
    list: [
      {
        key: 'foo',
        title: 'Foo',
        value: 'f_o_o',
      },
      {
        key: 'bar',
        title: 'Bar',
        href: 'https://bar',
        value: 'f_o_o',
      },
      {
        key: 'foobar',
        title: 'FooBar',
        type: 'TextArea',
        value: 'asd\nasd\nasd\n',
      },
    ],
  };

  it('should render properly', () => {
    const { asFragment } = render(<SummaryList {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
