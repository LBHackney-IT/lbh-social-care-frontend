import { act, fireEvent, render } from '@testing-library/react';

import UserContext from 'components/UserContext/UserContext';
import Search from './Search';

import { getResidents } from 'utils/api/residents';

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock('utils/api/residents', () => ({
  getResidents: jest.fn(),
}));

describe(`Search`, () => {
  const props = {
    onFormSubmit: jest.fn(),
    query: {},
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
    const { getByRole, getByLabelText, queryByText } = render(
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
    // expect(queryByText('Add New Person')).toBeInTheDocument();
    expect(queryByText('PEOPLE SEARCH RESULT')).toBeInTheDocument();
    expect(queryByText('load more')).not.toBeInTheDocument();
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
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(queryByText('load more')).toBeInTheDocument();
  });

  it('should work properly on search fails', async () => {
    getResidents.mockImplementation(() =>
      Promise.reject({ response: { data: 'I am an ERROR' } })
    );
    const { getByRole, getByLabelText, queryByText } = render(
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
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    // expect(queryByText('Add New Person')).toBeInTheDocument();
    expect(queryByText('I am an ERROR')).toBeInTheDocument();
  });
});
