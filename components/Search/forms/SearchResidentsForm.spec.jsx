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
    query: {},
  };

  it('should pass to onFormSubmit the form values', async () => {
    const { getByRole, getByLabelText } = render(
      <SearchResidentsForm {...props} />
    );

    const firstNameInput = getByLabelText('First name:');
    fireEvent.change(firstNameInput, { target: { value: 'foo' } });

    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: 'foo',
      last_name: '',
      mosaic_id: '',
      postcode: '',
    });
  });

  it('should initialise the form with the passed query', async () => {
    const { getByRole } = render(
      <SearchResidentsForm {...props} query={{ first_name: 'bar' }} />
    );
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(props.onFormSubmit).toHaveBeenCalledWith({
      first_name: 'bar',
      last_name: '',
      mosaic_id: '',
      postcode: '',
    });
  });
});
