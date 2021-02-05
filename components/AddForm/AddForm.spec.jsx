import { render, waitFor, fireEvent } from '@testing-library/react';

import AddForm from './AddForm';
import { UserContext } from 'components/UserContext/UserContext';

describe('AddForm component', () => {
  it('should render adult forms', async () => {
    const props = {
      person: {
        firstName: 'Foo',
        lastName: 'Bar',
        mosaicId: '123',
        ageContext: 'A',
      },
    };
    const { getByTestId, getByText, getByRole } = render(
      <UserContext.Provider
        value={{
          user: { name: 'Nom', email: 'i am the email' },
        }}
      >
        <AddForm {...props} />
      </UserContext.Provider>
    );

    await waitFor(() => {
      getByTestId('category');
    });
    fireEvent.change(getByTestId('category'), {
      target: { value: 'Occupational Therapy and Mobility' },
    });
    expect(
      getByText('Occupational Therapy and Mobility').selected
    ).toBeTruthy();
    expect(getByRole('option', { name: 'Freedom Pass' })).toBeInTheDocument();
  });

  it('should render children forms', async () => {
    const props = {
      person: {
        firstName: 'Foo',
        lastName: 'Bar',
        mosaicId: '123',
        ageContext: 'C',
      },
    };
    const { getByRole, asFragment, getByText, getByTestId } = render(
      <UserContext.Provider
        value={{
          user: { name: 'Nom', email: 'i am the email' },
        }}
      >
        <AddForm {...props} />
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
