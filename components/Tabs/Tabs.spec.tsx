import { render } from '@testing-library/react';

import Tabs from './Tabs';

const mockedUseRouter = { pathname: '/foo' };

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

describe(`Tabs`, () => {
  const props = {
    title: 'foo',
    tabs: [
      {
        url: '/foo',
        text: 'foo',
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
