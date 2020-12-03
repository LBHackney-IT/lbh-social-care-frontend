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
    query: {},
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
      case_note_type: '',
      exact_name_match: false,
      worker_email: '',
    });
  });

  it('should pass the user email as worker_email', async () => {
    const { getByRole, getByLabelText } = render(
      <SearchCasesForm {...props} user={{ email: 'foo@bar.com' }} />
    );
    const my_notes_onlyCheckbox = getByLabelText(
      "Only include notes I've created"
    );
    fireEvent.click(my_notes_onlyCheckbox);
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: '',
      last_name: '',
      case_note_type: '',
      exact_name_match: false,
      worker_email: 'foo@bar.com',
    });
  });

  it('should initialise the form with the passed query', async () => {
    const { getByRole } = render(
      <SearchCasesForm {...props} query={{ first_name: 'bar' }} />
    );
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: 'bar',
      last_name: '',
      case_note_type: '',
      exact_name_match: false,
      worker_email: '',
    });
  });
});
