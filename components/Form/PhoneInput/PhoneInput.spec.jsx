import { fireEvent, render } from '@testing-library/react';
import PhoneInput from './PhoneInput';

describe('PhoneInput', () => {
  it('renders a phone input', () => {
    const inputName = 'my-phone-input';
    const inputLabel = 'My Input';
    const { getByLabelText } = render(
      <PhoneInput name={inputName} label={inputLabel} />
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
      <PhoneInput name={'my-input'} label={'My Input'} onChange={myAction} />
    );

    fireEvent.change(getByLabelText(/\s*My Input\s*/), {
      target: { value: '07849436768' },
    });

    expect(newValue).toEqual('07849436768');
  });
});
