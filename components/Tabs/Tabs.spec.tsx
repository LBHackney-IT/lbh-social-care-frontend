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
  it('should not add mosaic_id if a person_id is present and the url is /search', () => {
    const query = { person_id: 123 } as unknown as ParsedUrlQuery;
    const updatedQuery = updateQuery(query, '/search');
    if (updatedQuery) {
      expect(updatedQuery.mosaic_id).toBe(undefined);
    }
  });
  it('should remove name if a name is present and the url is /cases', () => {
    const query = { person_id: 123, name: 'tom' } as unknown as ParsedUrlQuery;
    const updatedQuery = updateQuery(query, '/cases');
    if (updatedQuery) {
      expect(updatedQuery.mosaic_id).toBe(123);
      expect(updatedQuery.name).toBe(undefined);
    }
  });
  it('should remove name, date of birth and postcode if they are present and the url is /cases', () => {
    const query = {
      person_id: 123,
      name: 'tom',
      date_of_birth: '22-01-2022',
      postcode: 'N1 1QA',
    } as unknown as ParsedUrlQuery;
    const updatedQuery = updateQuery(query, '/cases');
    if (updatedQuery) {
      expect(updatedQuery.mosaic_id).toBe(123);
      expect(updatedQuery.name).toBe(undefined);
    }
  });
  it('should not remove name, date of birth and postcode if they are present and the url is /search', () => {
    const query = {
      person_id: 123,
      name: 'tom',
      date_of_birth: '22-01-2022',
      postcode: 'N1 1QA',
    } as unknown as ParsedUrlQuery;
    const updatedQuery = updateQuery(query, '/search');
    if (updatedQuery) {
      expect(updatedQuery.name).toBe('tom');
      expect(updatedQuery.date_of_birth).toBe('22-01-2022');
      expect(updatedQuery.postcode).toBe('N1 1QA');
    }
  });
});
