import { render, waitFor, fireEvent } from '@testing-library/react';
import AddForm from './AddForm';
import { UserContext } from 'components/UserContext/UserContext';
import { getResident } from 'utils/api/residents';
import { getUserType } from 'utils/user';

jest.mock('utils/api/residents', () => ({
  getResident: jest.fn(),
}));

jest.mock('utils/user', () => ({
  getUserType: jest.fn(),
}));

describe('AddForm component', () => {
  getResident.mockImplementation(() =>
    Promise.resolve({
      firstName: 'Foo',
      lastName: 'Bar',
      mosaicId: '123',
    })
  );
  it('should render adult forms', async () => {
    getUserType.mockImplementation(() => 'Adult');
    const { getByTestId, getByText, getByRole } = render(
      <UserContext.Provider
        value={{
          user: { name: 'Nom', email: 'i am the email' },
        }}
      >
        <AddForm />
      </UserContext.Provider>
    );

    await waitFor(() => {
      getByTestId('category');
    });
    fireEvent.change(getByTestId('category'), { target: { value: 'General' } });
    expect(getByText('General').selected).toBeTruthy();
    expect(getByRole('option', { name: 'Freedom Pass' })).toBeInTheDocument();
  });

  it('should render children forms', async () => {
    getUserType.mockImplementation(() => 'Children');

    const { getByRole, asFragment, getByText, getByTestId } = render(
      <UserContext.Provider
        value={{
          user: { name: 'Nom', email: 'i am the email' },
        }}
      >
        <AddForm />
      </UserContext.Provider>
    );

    await waitFor(() => {
      getByTestId('category');
    });
    expect(asFragment()).toMatchSnapshot();
    fireEvent.change(getByTestId('category'), { target: { value: 'General' } });
    expect(getByText('General').selected).toBeTruthy();
    expect(getByRole('option', { name: 'CFS Visit' })).toBeInTheDocument();
  });
});
