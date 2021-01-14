import { act, fireEvent, render } from '@testing-library/react';

import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { UserContext } from 'components/UserContext/UserContext';
import { getResidents } from 'utils/api/residents';

import Search from './Search';

jest.mock('utils/api/residents', () => ({
  getResidents: jest.fn(),
}));

describe(`Search`, () => {
  const props = {
    onFormSubmit: jest.fn(),
  };

  it('should work properly on search success', async () => {
    getResidents.mockImplementation(() =>
      Promise.resolve({
        residents: [
          {
            firstName: 'foo',
            lastName: '',
            mosaicId: '',
            dateOfBirth: '2020-11-11',
          },
        ],
      })
    );
    const { queryByText, findByText } = render(
      <RouterContext.Provider
        value={{ query: { foo: 'bar' }, replace: jest.fn() }}
      >
        <UserContext.Provider
          value={{
            user: { name: 'foo' },
          }}
        >
          <Search {...props} type="people" />
        </UserContext.Provider>
      </RouterContext.Provider>
    );
    const searchResult = await findByText('PEOPLE SEARCH RESULT');
    expect(searchResult).toBeInTheDocument();
    // expect(queryByText('Add New Person')).toBeInTheDocument();
    expect(queryByText('load more')).not.toBeInTheDocument();
  });

  it('should work properly on search success - with cursor', async () => {
    getResidents.mockImplementation(() =>
      Promise.resolve({
        residents: [
          {
            firstName: 'foo',
            lastName: '',
            mosaicId: '',
            dateOfBirth: '2020-11-11',
          },
        ],
        nextCursor: 'foo',
      })
    );
    const { queryByText, findByText } = render(
      <RouterContext.Provider
        value={{ query: { foo: 'bar' }, replace: jest.fn() }}
      >
        <UserContext.Provider
          value={{
            user: { name: 'foo' },
          }}
        >
          <Search {...props} type="people" />
        </UserContext.Provider>
      </RouterContext.Provider>
    );
    const searchResult = await findByText('PEOPLE SEARCH RESULT');
    expect(searchResult).toBeInTheDocument();
    expect(queryByText('load more')).toBeInTheDocument();
  });

  it('should update the queryString on search', async () => {
    const mockOnReplace = jest.fn();
    const { queryByText, getByLabelText, getByRole } = render(
      <RouterContext.Provider
        value={{
          query: { foo: 'bar' },
          pathname: 'foopath',
          replace: mockOnReplace,
        }}
      >
        <UserContext.Provider
          value={{
            user: { name: 'foo' },
          }}
        >
          <Search {...props} type="people" />
        </UserContext.Provider>
      </RouterContext.Provider>
    );
    const firstNameInput = getByLabelText('First name:');
    fireEvent.change(firstNameInput, { target: { value: 'foo' } });
    expect(queryByText('Add New Person')).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(mockOnReplace).toHaveBeenCalled();
    expect(mockOnReplace).toHaveBeenCalledWith(
      'foopath?foo=bar&first_name=foo',
      'foopath?foo=bar&first_name=foo',
      { shallow: true }
    );
  });

  it('should work properly on search fails', async () => {
    getResidents.mockImplementation(() => Promise.reject());
    const { findByText } = render(
      <RouterContext.Provider
        value={{ query: { foo: 'bar' }, replace: jest.fn() }}
      >
        <UserContext.Provider
          value={{
            user: { name: 'foo' },
          }}
        >
          <Search {...props} type="people" />
        </UserContext.Provider>
      </RouterContext.Provider>
    );
    const errorLabel = await findByText('Oops an error occurred');
    expect(errorLabel).toBeInTheDocument();
    // expect(queryByText('Add New Person')).toBeInTheDocument();
  });
});
