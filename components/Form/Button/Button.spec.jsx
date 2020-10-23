import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders a button', () => {
    const buttonText = 'My Button';
    const { getByText } = render(<Button label={buttonText} />);
    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  it('performs an action onClick', () => {
    const buttonText = 'My Button';
    const myAction = jest.fn();
    const { getByText } = render(
      <Button label={buttonText} onClick={myAction} />
    );
    fireEvent(
      getByText(buttonText),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(myAction).toHaveBeenCalled();
  });
});
