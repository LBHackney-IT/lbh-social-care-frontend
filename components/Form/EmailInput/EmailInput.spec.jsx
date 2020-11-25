import { fireEvent, render } from '@testing-library/react';
import EmailInput from './EmailInput';

describe('EmailInput', () => {
  it('renders a email input', () => {
    const inputName = 'my-email-input';
    const inputLabel = 'My Input';
    const { getByLabelText } = render(
      <EmailInput name={inputName} label={inputLabel} />
    );

    const labelRegex = new RegExp(`s*${inputLabel}s*`);
    const input = getByLabelText(labelRegex);

    expect(input).toBeInTheDocument();
    expect(input.id).toEqual(inputName);
    expect(input.name).toEqual(inputName);
  });

  it('performs an action onChange', () => {
    let newValue = '';
    const myAction = jest.fn((e) => (newValue = e.target.value));
    const { getByLabelText } = render(
      <EmailInput name={'my-input'} label={'My Input'} onChange={myAction} />
    );

    fireEvent.change(getByLabelText(/\s*My Input\s*/), {
      target: { value: 'test@test.com' },
    });

    expect(newValue).toEqual('test@test.com');
  });
});
