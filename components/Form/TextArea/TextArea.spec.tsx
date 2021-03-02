import { fireEvent, render } from '@testing-library/react';
import TextArea from './TextArea';

describe('TextArea component', () => {
  it('should render properly', () => {
    const inputName = 'my-text-area';
    const inputLabel = 'My text area';
    const { getByLabelText } = render(
      <TextArea name={inputName} label={inputLabel} />
    );

    const labelRegex = new RegExp(`s*${inputLabel}s*`);
    const input = getByLabelText(labelRegex) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.id).toEqual(inputName);
    expect(input.name).toEqual(inputName);
  });

  it('performs an action onChange', () => {
    let newValue = '';
    const myAction = jest.fn((e) => (newValue = e.target.value));
    const { getByLabelText } = render(
      <TextArea
        name={'my-text-area'}
        label={'My text area'}
        onChange={myAction}
      />
    );

    fireEvent.change(getByLabelText(/\s*My text area\s*/), {
      target: { value: 'hello' },
    });

    expect(newValue).toEqual('hello');
  });
});
