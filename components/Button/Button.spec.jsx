import { render, fireEvent } from '@testing-library/react';

import Router from 'next/router';

jest.mock('next/router', () => ({ push: jest.fn() }));

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
    fireEvent.click(getByText(buttonText));
    expect(myAction).toHaveBeenCalled();
  });

  it('should render properly with route', () => {
    const props = {
      label: 'Foo',
      route: 'foo/bar',
      internalQuery: '?foo',
    };
    const { getByText } = render(<Button {...props} />);
    fireEvent.click(getByText('Foo'));
    expect(Router.push).toHaveBeenCalled();
    expect(Router.push).toHaveBeenCalledWith('foo/bar?foo');
  });
});
