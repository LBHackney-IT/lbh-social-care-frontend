import { act, fireEvent, render } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

import SearchResidentsForm from './SearchResidentsForm';

describe(`SearchResidentsForm`, () => {
  const props = {
    onFormSubmit: jest.fn(),
    defaultValues: {},
  };

  it('should pass to onFormSubmit the form values', async () => {
    const { getByRole, getByLabelText } = render(
      <SearchResidentsForm {...props} />
    );

    const firstNameInput = getByLabelText('First name');
    fireEvent.change(firstNameInput, { target: { value: 'foo' } });

    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: 'foo',
      last_name: '',
      person_id: '',
      postcode: '',
      date_of_birth: null,
    });
  });

  it('should not submit with a postcode fragment less than two characters', async () => {
    const { getByRole, getByLabelText, getByText } = render(
      <SearchResidentsForm {...props} />
    );

    const firstNameInput = getByLabelText('Postcode');
    fireEvent.change(firstNameInput, { target: { value: 'E' } });

    props.onFormSubmit.mockClear();

    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).not.toHaveBeenCalledWith();
    expect(
      getByText('You must enter at least the first two letters of the postcode')
    ).toBeVisible();
  });

  it('should submit with a postcode fragment', async () => {
    const { getByRole, getByLabelText } = render(
      <SearchResidentsForm {...props} />
    );

    const firstNameInput = getByLabelText('Postcode');
    fireEvent.change(firstNameInput, { target: { value: 'E8' } });

    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: '',
      last_name: '',
      person_id: '',
      postcode: 'E8',
      date_of_birth: null,
    });
  });

  it('should submit with a full postcode', async () => {
    const { getByRole, getByLabelText } = render(
      <SearchResidentsForm {...props} />
    );

    const firstNameInput = getByLabelText('Postcode');
    fireEvent.change(firstNameInput, { target: { value: 'E8 1AA' } });

    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: '',
      last_name: '',
      person_id: '',
      postcode: 'E8 1AA',
      date_of_birth: null,
    });
  });

  it('should initialise the form with the passed defaultValues', async () => {
    const { getByRole } = render(
      <SearchResidentsForm {...props} defaultValues={{ first_name: 'bar' }} />
    );
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: 'bar',
      last_name: '',
      person_id: '',
      postcode: '',
      date_of_birth: null,
    });
  });
});
