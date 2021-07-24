import { fireEvent, render, screen } from '@testing-library/react';
import Tab from './Tab';

describe('Tab', () => {
  it('correctly responds to the current value', () => {
    render(
      <Tab filter={'mine'} value={'mine'} setFilter={jest.fn()}>
        Foo
      </Tab>
    );
    expect(screen.getByText('Foo').parentElement?.className).toContain(
      'active'
    );
  });

  it('calls the change handler', () => {
    const mockHandler = jest.fn();
    render(
      <Tab filter={'all'} value={'mine'} setFilter={mockHandler}>
        foo
      </Tab>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandler).toBeCalled();
    expect(mockHandler).toBeCalledWith('mine');
  });
});
