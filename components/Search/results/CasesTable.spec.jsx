import { fireEvent, render } from '@testing-library/react';

import CasesTable from './CasesTable';

describe('CasesTable component', () => {
  const props = {
    onSort: jest.fn(),
    records: [
      {
        recordId: '123',
        dateOfBirth: '25/10/2000',
        dateOfEvent: '25/10/2020 13:49:43',
        firstName: 'foo',
        lastName: 'bar',
        formName: 'i am a form',
        caseFormUrl: 'https://foo.bar',
        officerEmail: 'Fname.Lname@hackney.gov.uk',
      },
    ],
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
