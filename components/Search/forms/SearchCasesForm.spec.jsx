import { act, fireEvent, render } from '@testing-library/react';

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
    user: {
      name: 'i am a user',
    },
  };

  afterEach(() => {
    props.onFormSubmit.mockClear();
  });

  it('should pass to onFormSubmit the form values', async () => {
    const { getByRole, getByLabelText } = render(
      <SearchCasesForm {...props} user={{ email: 'foo@bar.com' }} />
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
    });
  });

  it('should pass the user email as worker_email', async () => {
    const { getByRole, getByLabelText } = render(
      <SearchCasesForm {...props} user={{ email: 'foo@bar.com' }} />
    );
    const my_notes_onlyCheckbox = getByLabelText(
      "Only include records I've created"
    );
    fireEvent.click(my_notes_onlyCheckbox);
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: '',
      last_name: '',
      form_name: '',
      exact_name_match: false,
      my_notes_only: true,
    });
  });

  it('should initialise the form with the passed defaultValues', async () => {
    const { getByRole } = render(
      <SearchCasesForm {...props} defaultValues={{ first_name: 'bar' }} />
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
    });
  });
});
