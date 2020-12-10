import { render } from '@testing-library/react';

import CasesTable from './CasesTable';

describe('CasesTable component', () => {
  const props = {
    records: [
      {
        personId: 123,
        dateOfBirth: '25/10/2000',
        caseFormTimestamp: '25/10/2020 13:49:43',
        firstName: 'foo',
        lastName: 'bar',
        caseFormUrl: 'https://foo.bar',
        officerEmail: 'Fname.Lname@hackney.gov.uk',
        formName: 'foo',
      },
    ],
  };
  it('should render properly', () => {
    const { asFragment } = render(<CasesTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
