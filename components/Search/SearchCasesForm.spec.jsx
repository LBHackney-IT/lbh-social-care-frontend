import { act, fireEvent, render } from '@testing-library/react';

jest.mock('next/router', () => ({
  replace: jest.fn(),
}));

import SearchCasesForm from './SearchCasesForm';

describe(`SearchCasesForm`, () => {
  const props = {
    onFormSubmit: jest.fn(),
    query: {},
  };

  it('should pass to onFormSubmit the form values', async () => {
    const { getByRole, getByLabelText } = render(
      <SearchCasesForm {...props} />
    );

    const firstNameInput = getByLabelText('First name:');
    fireEvent.change(firstNameInput, { target: { value: 'foo' } });

    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: 'foo',
      last_name: '',
      exact_match: '',
      date_created_from: '',
      date_created_to: '',
      case_note_type: '',
      myNotesOnly: '',
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
      exact_match: '',
      date_created_from: '',
      date_created_to: '',
      case_note_type: '',
      myNotesOnly: '',
    });
  });
});
