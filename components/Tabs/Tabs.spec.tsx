import { render } from '@testing-library/react';
import { ParsedUrlQuery } from 'querystring';
import Tabs from './Tabs';
import { updateQuery } from './Tabs';

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

  it('should add mosaic_id if a person_id is present and the url is /cases', () => {
    const query = { person_id: 123 } as unknown as ParsedUrlQuery;
    const updatedQuery = updateQuery(query, '/cases');
    if (updatedQuery) {
      expect(updatedQuery.mosaic_id).toBe(123);
    }
  });
});
