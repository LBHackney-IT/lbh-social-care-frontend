import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

const mockedUseRouter = {
  query: { foo: 'bar' },
  push: jest.fn(),
  pathname: 'foopath',
};

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

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
    expect(mockedUseRouter.push).toHaveBeenCalled();
    expect(mockedUseRouter.push).toHaveBeenCalledWith('foo/bar?foo');
  });
});
