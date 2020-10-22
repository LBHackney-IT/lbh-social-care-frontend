import { render } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox', () => {
    const checkboxName = 'my-checkbox';
    const checkboxLabel = 'My Checkbox';
    const { getByLabelText } = render(
      <Checkbox
        name={checkboxName}
        label={checkboxLabel}
        register={jest.fn()}
      />
    );

    const checkbox = getByLabelText(checkboxLabel);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox.id).toEqual(checkboxName);
    expect(checkbox.name).toEqual(checkboxName);
  });
});
