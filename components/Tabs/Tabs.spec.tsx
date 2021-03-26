import { render } from '@testing-library/react';

import Tabs from './Tabs';

describe(`Tabs`, () => {
  const props = {
    title: 'foo',
    tabs: [
      {
        url: '/foo',
        text: 'foo',
        isSelected: true,
      },
      { url: '/bar', text: 'bar' },
    ],
    children: <p>I am the content!</p>,
  };

  it('should render properly', () => {
    const { asFragment } = render(<Tabs {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
