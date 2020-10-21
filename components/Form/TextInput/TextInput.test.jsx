import { fireEvent, render } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput', () => {
  it('renders a text input', () => {
    const inputName = 'my-text-input';
    const inputLabel = 'My Input';
    const { getByLabelText } = render(
      <TextInput name={inputName} label={inputLabel} />
    );

    const labelRegex = new RegExp(`s*${inputLabel}s*`);
    const input = getByLabelText(labelRegex);

    expect(input).toBeInTheDocument();
    expect(input.id).toEqual(inputName);
    expect(input.name).toEqual(inputName);
  });

  it('performs an action onChange', () => {
    let newValue = '';
    const myAction = jest.fn(e => (newValue = e.target.value));
    const { getByLabelText } = render(
      <TextInput name={'my-input'} label={'My Input'} onChange={myAction} />
    );

    fireEvent.change(getByLabelText(/\s*My Input\s*/), {
      target: { value: 'hello' }
    });

    expect(newValue).toEqual('hello');
  });
});
