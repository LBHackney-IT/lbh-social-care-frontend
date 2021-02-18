import { act, fireEvent, render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { getResidents } from 'utils/api/residents';
import { getCases } from 'utils/api/cases';

import Search from './Search';

const mockedUseRouter = {
  query: { foo: 'bar' },
  replace: jest.fn(),
  pathname: 'foopath',
};

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

jest.mock('utils/api/residents', () => ({
  getResidents: jest.fn(),
}));

jest.mock('utils/api/cases', () => ({
  getCases: jest.fn(),
}));

describe(`Search`, () => {
  const props = {
    onFormSubmit: jest.fn(),
  };

  it('should update the queryString on search and run a new search - with load more', async () => {
    getResidents.mockImplementation(() => ({
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
          user: { name: 'foo' },
        }}
      >
        <Search {...props} type="people" />
      </UserContext.Provider>
    );
    const firstNameInput = getByLabelText('First name:');
    fireEvent.change(firstNameInput, { target: { value: 'foo' } });
    expect(queryByText('Add New Person')).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(mockedUseRouter.replace).toHaveBeenCalled();
    expect(
      mockedUseRouter.replace
    ).toHaveBeenCalledWith(
      'foopath?foo=bar&first_name=foo',
      'foopath?foo=bar&first_name=foo',
      { shallow: true, scroll: false }
    );
    const searchResult = await findByText('PEOPLE SEARCH RESULT');
    expect(searchResult).toBeInTheDocument();
    expect(queryByText('load more')).not.toBeInTheDocument();
  });

  it('should update the queryString on search and run a new search', async () => {
    getResidents.mockImplementation(() => ({
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
          user: { name: 'foo' },
        }}
      >
        <Search {...props} type="people" />
      </UserContext.Provider>
    );
    const firstNameInput = getByLabelText('First name:');
    fireEvent.change(firstNameInput, { target: { value: 'foo' } });
    expect(queryByText('Add New Person')).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(mockedUseRouter.replace).toHaveBeenCalled();
    expect(
      mockedUseRouter.replace
    ).toHaveBeenCalledWith(
      'foopath?foo=bar&first_name=foo',
      'foopath?foo=bar&first_name=foo',
      { shallow: true, scroll: false }
    );
    const searchResult = await findByText('PEOPLE SEARCH RESULT');
    expect(searchResult).toBeInTheDocument();
  });

  it('should work properly on search fails', async () => {
    getResidents.mockImplementation(() => ({ error: true }));
    const { findByText } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo' },
        }}
      >
        <Search {...props} type="people" />
      </UserContext.Provider>
    );
    const errorLabel = await findByText('Oops an error occurred');
    expect(errorLabel).toBeInTheDocument();
    // expect(queryByText('Add New Person')).toBeInTheDocument();
  });

  it('should search Cases for user email if "Only include records I have created" is selected', () => {
    getCases.mockImplementation(() => ({}));
    mockedUseRouter.query = {
      worker_email: 'worker@email.com',
      my_notes_only: true,
    };
    render(
      <UserContext.Provider
        value={{
          user: { email: 'user@email.com' },
        }}
      >
        <Search {...props} type="records" />
      </UserContext.Provider>
    );
    expect(getCases).toHaveBeenCalledWith(
      { worker_email: 'user@email.com' },
      true
    );
  });
});
