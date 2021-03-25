import { act, fireEvent, render } from '@testing-library/react';
import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

import SearchCasesForm from './SearchCasesForm';

describe(`SearchCasesForm`, () => {
  const props = {
    onFormSubmit: jest.fn(),
    defaultValues: {},
    user: mockedUser,
  };

  afterEach(() => {
    props.onFormSubmit.mockClear();
  });

  it('should pass to onFormSubmit the form values', async () => {
    const { getByRole, getByLabelText } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <SearchCasesForm {...props} />
      </UserContext.Provider>
    );
    const firstNameInput = getByLabelText('First name:');
    fireEvent.change(firstNameInput, { target: { value: 'foo' } });
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: 'foo',
      last_name: '',
      form_name: '',
      exact_name_match: false,
      my_notes_only: false,
      end_date: null,
      start_date: null,
      worker_email: '',
    });
  });

  it('should initialise the form with the passed defaultValues', async () => {
    const { getByRole } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <SearchCasesForm {...props} defaultValues={{ first_name: 'bar' }} />
      </UserContext.Provider>
    );
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: 'bar',
      last_name: '',
      form_name: '',
      exact_name_match: false,
      my_notes_only: false,
      end_date: null,
      start_date: null,
      worker_email: '',
    });
  });
});
