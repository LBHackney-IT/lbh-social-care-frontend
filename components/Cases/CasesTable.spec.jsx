import { render } from '@testing-library/react';

import CasesTable from './CasesTable';

describe('CasesTable component', () => {
  const props = {
    cases: [
      {
        personId: 'foo',
        firstName: 'Fname',
        lastName: 'Lname',
        formName: 'foorm',
        dateOfBirth: '1978-02-23T00:00:00.0000000',
        caseFormUrl: 'https://foo.bar',
      },
    ],
  };
  it('should render properly', () => {
    const { asFragment } = render(<CasesTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
