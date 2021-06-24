import { fireEvent, render, screen } from '@testing-library/react';
import Filter from './Filter';

describe('Filter', () => {
  it('correctly responds to the current value', () => {
    render(
      <Filter filter={'mine'} value={'mine'} setFilter={jest.fn()}>
        Foo
      </Filter>
    );
    expect(
      (screen.getByLabelText('Foo') as HTMLInputElement).checked
    ).toBeTruthy();
  });

  it('calls the change handler', () => {
    const mockHandler = jest.fn();
    render(
      <Filter filter={'all'} value={'mine'} setFilter={mockHandler}>
        foo
      </Filter>
    );
    fireEvent.click(screen.getByRole('radio'));
    expect(mockHandler).toBeCalled();
    expect(mockHandler).toBeCalledWith('mine');
  });
});
