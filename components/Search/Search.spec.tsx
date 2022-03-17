import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { useCases } from 'utils/api/cases';

import Search from './Search';
import { User } from '../../types';
import { ParsedUrlQuery } from 'querystring';
import { SearchPerson } from 'utils/api/search';

const mockedUseRouter = {
  query: { foo: 'bar' } as unknown as ParsedUrlQuery,
  replace: jest.fn(),
  pathname: 'foopath',
};

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

jest.mock('utils/api/search', () => ({
  SearchPerson: jest
    .fn()
    .mockReturnValue({ size: 0, setSize: jest.fn(), data: {}, error: null }),
}));

jest.mock('utils/api/cases', () => ({
  useCases: jest.fn(),
}));

describe(`Search`, () => {
  const props = {
    onFormSubmit: jest.fn(),
    subHeader: <>Filter results by (any combination)</>,
    resultHeader: 'PEOPLE SEARCH RESULT',
  };

  it('should update the queryString on search and run a new search - with load more', async () => {
    (SearchPerson as jest.Mock).mockImplementation(() => ({
      size: 0,
      data: [
        {
          residents: [
            {
              firstName: 'foo',
              lastName: '',
              mosaicId: '',
              dateOfBirth: '2020-11-11',
            },
          ],
        },
      ],
    }));
    const { queryByText, getByLabelText, findByText, getByRole } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo' } as unknown as User,
        }}
      >
        <Search {...props} type="people" />
      </UserContext.Provider>
    );
    const nameInput = getByLabelText('First name');
    fireEvent.change(nameInput, { target: { value: 'foo' } });
    await waitFor(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(mockedUseRouter.replace).toHaveBeenCalled();
    expect(mockedUseRouter.replace).toHaveBeenCalledWith(
      'foopath?foo=bar&first_name=foo',
      'foopath?foo=bar&first_name=foo',
      { shallow: true, scroll: false }
    );
    const searchResult = await findByText('PEOPLE SEARCH RESULT');
    expect(searchResult).toBeInTheDocument();
    expect(queryByText('Load more')).not.toBeInTheDocument();
  });

  it('should update the queryString on search and run a new search', async () => {
    (SearchPerson as jest.Mock).mockImplementation(() => ({
      size: 0,
      data: [
        {
          residents: [
            {
              firstName: 'foo',
              lastName: '',
              mosaicId: '',
              dateOfBirth: '2020-11-11',
            },
          ],
        },
      ],
    }));
    const { getByLabelText, findByText, getByRole } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo' } as unknown as User,
        }}
      >
        <Search {...props} type="people" />
      </UserContext.Provider>
    );
    const nameInput = getByLabelText('First name');
    fireEvent.change(nameInput, { target: { value: 'foo' } });
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(mockedUseRouter.replace).toHaveBeenCalled();
    expect(mockedUseRouter.replace).toHaveBeenCalledWith(
      'foopath?foo=bar&first_name=foo',
      'foopath?foo=bar&first_name=foo',
      { shallow: true, scroll: false }
    );
    const searchResult = await findByText('PEOPLE SEARCH RESULT');
    expect(searchResult).toBeInTheDocument();
  });

  it('should work properly on search fails', async () => {
    (SearchPerson as jest.Mock).mockImplementation(() => ({ error: true }));
    const { findByText } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo' } as unknown as User,
        }}
      >
        <Search {...props} type="people" />
      </UserContext.Provider>
    );
    const errorLabel = await findByText(
      'There was a problem. Please refresh the page or try again later.'
    );
    expect(errorLabel).toBeInTheDocument();
  });

  it('should search Cases for user email if "Only include records I have created" is selected', () => {
    (useCases as jest.Mock).mockImplementation(() => ({}));
    mockedUseRouter.query = {
      worker_email: 'worker@email.com',
      my_notes_only: 'true',
    };
    render(
      <UserContext.Provider
        value={{
          user: { email: 'user@email.com' } as unknown as User,
        }}
      >
        <Search {...props} type="records" />
      </UserContext.Provider>
    );
    expect(useCases).toHaveBeenCalledWith(
      { worker_email: 'user@email.com' },
      true
    );
  });

  it('when there are less than 20 results shows add a user', async () => {
    (SearchPerson as jest.Mock).mockImplementation(
      makeSearchResultsImplementation(1)
    );

    const { getByText, getByLabelText, getByRole } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo' } as unknown as User,
        }}
      >
        <Search {...props} type="people" />
      </UserContext.Provider>
    );

    const nameInput = getByLabelText('First name');
    fireEvent.change(nameInput, { target: { value: 'foo' } });
    act(() => {
      fireEvent.submit(getByRole('form'));
    });

    expect(getByText('add a new person')).toBeInTheDocument();
  });
});
it('when there are more than 20 but less than 40 results shows add a user after one load more clicks', async () => {
  (SearchPerson as jest.Mock).mockImplementation(
    makeSearchResultsImplementation(2)
  );

  const { getByText, getByLabelText, getByRole } = render(
    <UserContext.Provider
      value={{
        user: { name: 'foo' } as unknown as User,
      }}
    >
      <Search {...props} type="people" />
    </UserContext.Provider>
  );

  const nameInput = getByLabelText('First name');
  fireEvent.change(nameInput, { target: { value: 'foo' } });
  await act(async () => {
    fireEvent.submit(getByRole('form'));
  });

  await waitFor(() =>
    expect(getByText('add a new person')).toBeInTheDocument()
  );
});

it('when there are more than 60 results shows add a user after two load more clicks', async () => {
  (SearchPerson as jest.Mock).mockImplementation(
    makeSearchResultsImplementation(3)
  );

  const { getByText, getByLabelText, getByRole } = render(
    <UserContext.Provider
      value={{
        user: { name: 'foo' } as unknown as User,
      }}
    >
      <Search {...props} type="people" />
    </UserContext.Provider>
  );

  const nameInput = getByLabelText('First name');
  fireEvent.change(nameInput, { target: { value: 'foo' } });
  await act(async () => {
    fireEvent.submit(getByRole('form'));
  });

  await waitFor(() =>
    expect(getByText('add a new person')).toBeInTheDocument()
  );
});

const makeSearchResultsImplementation = (count: number) => () => {
  const response: { size: number; data: Array<unknown> } = {
    size: 1,
    data: [],
  };

  for (let i = 0; i < count; i++) {
    response.data.push({
      nextCursor: '',
      totalCount: count * 20 - 1,
      residents: new Array(count * 20 - 1)
        .fill({
          firstName: 'Ross',
          lastName: 'Geller',
          uprn: '10002263753',
          dateOfBirth: '2006-02-03T00:00:00.0000000',
          ageContext: 'A',
          gender: 'M',
          nhsNumber: '9707109432',
          restricted: 'N',
          address: { address: '4A, LONDON ROAD', postcode: 'TW1 3RR' },
        })
        .map((val, index) => ({
          ...val,
          mosaicId: index + i * 100,
        })),
    });
  }

  return response;
};
