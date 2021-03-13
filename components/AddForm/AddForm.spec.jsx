import { render, fireEvent, act } from '@testing-library/react';

import AddForm from './AddForm';
import { UserContext } from 'components/UserContext/UserContext';

jest.mock('data/googleForms/adultForms', () => [
  {
    text: 'Foo - Adult',
    value: 'https://foo.com',
    category: 'General',
    id: 'foo_adult',
  },
  {
    text: 'Bar - Adult',
    value: 'https://foo.com',
    category: 'General',
  },
]);

jest.mock('data/googleForms/childForms', () => [
  {
    text: 'Foo - Child',
    value: 'https://foo.com',
    category: 'General',
  },
  {
    text: 'Bar - Child',
    value: 'https://foo.com',
    category: 'General',
  },
]);

describe('AddForm component', () => {
  it('should render adult forms', async () => {
    const props = {
      person: {
        firstName: 'Foo',
        lastName: 'Bar',
        mosaicId: 123,
        ageContext: 'A',
      },
    };
    const { getByTestId, getByRole } = render(
      <UserContext.Provider
        value={{
          user: { name: 'Nom', email: 'i am the email' },
        }}
      >
        <AddForm {...props} />
      </UserContext.Provider>
    );

    const autocompleteInput = await getByTestId('formList');

    expect(autocompleteInput).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(autocompleteInput);
    });

    await act(async () => {
      fireEvent.click(getByRole('option', { name: 'Bar - Adult' }));
    });
    expect(autocompleteInput.value).toBe('Bar - Adult');
  });

  it('should render children forms', async () => {
    const props = {
      person: {
        firstName: 'Foo',
        lastName: 'Bar',
        mosaicId: 123,
        ageContext: 'C',
      },
    };
    const { getByRole, asFragment, getByTestId } = render(
      <UserContext.Provider
        value={{
          user: { name: 'Nom', email: 'i am the email' },
        }}
      >
        <AddForm {...props} />
      </UserContext.Provider>
    );

    const autocompleteInput = await getByTestId('formList');

    expect(autocompleteInput).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(autocompleteInput);
    });
    expect(asFragment()).toMatchSnapshot();

    await act(async () => {
      fireEvent.click(getByRole('option', { name: 'Foo - Child' }));
    });
    expect(autocompleteInput.value).toBe('Foo - Child');
  });
});
