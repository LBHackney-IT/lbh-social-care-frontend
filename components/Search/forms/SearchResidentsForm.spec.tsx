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

    const fullNameInput = getByLabelText('Name');
    fireEvent.change(fullNameInput, { target: { value: 'foo' } });

    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      name: 'foo',
      person_id: '',
      postcode: '',
      date_of_birth: null,
    });
  });

  it('should initialise the form with the passed defaultValues', async () => {
    const { getByRole } = render(
      <SearchResidentsForm {...props} defaultValues={{ name: 'bar' }} />
    );
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      name: 'bar',
      person_id: '',
      postcode: '',
      date_of_birth: null,
    });
  });
});
