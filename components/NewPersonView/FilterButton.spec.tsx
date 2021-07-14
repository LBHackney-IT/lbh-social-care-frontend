import { render, screen, fireEvent } from '@testing-library/react';
import FilterButton from './FilterButton';

const mockHandler = jest.fn();

describe('FilterButton', () => {
  it('renders checked if the value matches the filter', () => {
    render(
      <FilterButton filter="all" value="all" setFilter={mockHandler}>
        All
      </FilterButton>
    );

    expect((screen.getByLabelText('All') as HTMLInputElement).checked).toBe(
      true
    );
  });

  it('fires the handler when clicked', () => {
    render(
      <FilterButton filter="all" value="major" setFilter={mockHandler}>
        Major
      </FilterButton>
    );

    fireEvent.click(screen.getByLabelText('Major'));
    expect(mockHandler).toBeCalled();
    expect(mockHandler).toBeCalledWith('major');
  });
});
