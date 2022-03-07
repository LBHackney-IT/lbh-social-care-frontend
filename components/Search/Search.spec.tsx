import { act, fireEvent, render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { useResidents } from 'utils/api/residents';
import { useCases } from 'utils/api/cases';

import Search from './Search';
import { User } from '../../types';
import { ParsedUrlQuery } from 'querystring';

const mockedUseRouter = {
  query: { foo: 'bar' } as unknown as ParsedUrlQuery,
  replace: jest.fn(),
  pathname: 'foopath',
};

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

jest.mock('utils/api/residents', () => ({
  useResidents: jest.fn(),
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
    (useResidents as jest.Mock).mockImplementation(() => ({
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
    const nameInput = getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'foo' } });
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(mockedUseRouter.replace).toHaveBeenCalled();
    expect(mockedUseRouter.replace).toHaveBeenCalledWith(
      'foopath?foo=bar&name=foo',
      'foopath?foo=bar&name=foo',
      { shallow: true, scroll: false }
    );
    const searchResult = await findByText('PEOPLE SEARCH RESULT');
    expect(searchResult).toBeInTheDocument();
    expect(queryByText('Load more')).not.toBeInTheDocument();
  });

  it('should update the queryString on search and run a new search', async () => {
    (useResidents as jest.Mock).mockImplementation(() => ({
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
    const nameInput = getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'foo' } });
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(mockedUseRouter.replace).toHaveBeenCalled();
    expect(mockedUseRouter.replace).toHaveBeenCalledWith(
      'foopath?foo=bar&name=foo',
      'foopath?foo=bar&name=foo',
      { shallow: true, scroll: false }
    );
    const searchResult = await findByText('PEOPLE SEARCH RESULT');
    expect(searchResult).toBeInTheDocument();
  });

  it('should work properly on search fails', async () => {
    (useResidents as jest.Mock).mockImplementation(() => ({ error: true }));
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
});
