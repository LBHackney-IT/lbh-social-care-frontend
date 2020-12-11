import { render } from '@testing-library/react';

import CasesTable from './CasesTable';

describe('CasesTable component', () => {
  const props = {
    records: [
      {
        personId: 123,
        caseFormTimestamp: '25/10/2020 13:49:43',
        formName: 'foorm',
        caseFormUrl: 'https://foo.bar',
        officerEmail: 'Fname.Lname@hackney.gov.uk',
      },
    ],
  };
  it('should render properly', () => {
    const { asFragment } = render(<CasesTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
