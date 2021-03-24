import { fireEvent, render } from '@testing-library/react';

import CasesTable from './CasesTable';
import { mockedCaseNote } from 'factories/cases';

describe('CasesTable component', () => {
  const props = {
    onSort: jest.fn(),
    records: [mockedCaseNote],
  };

  it('should render properly', () => {
    const { asFragment } = render(<CasesTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the sort', () => {
    const { asFragment, rerender } = render(
      <CasesTable
        {...props}
        sort={{ order_by: 'desc', sort_by: 'first_name' }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    rerender(
      <CasesTable
        {...props}
        sort={{ order_by: 'asc', sort_by: 'first_name' }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should pass the correct sort to onSort', () => {
    const { getByText } = render(<CasesTable {...props} />);
    expect(props.onSort).not.toHaveBeenCalled();
    fireEvent.click(getByText('Client Name'));
    expect(props.onSort).toHaveBeenCalled();
    expect(props.onSort).toHaveBeenCalledWith('first_name');
  });
});
