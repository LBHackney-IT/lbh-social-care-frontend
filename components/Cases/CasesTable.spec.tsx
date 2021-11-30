import { render } from '@testing-library/react';

import CasesTable from './CasesTable';
import {
  mockedNote,
  mockedCaseNote,
  mockedAllocationNote,
} from 'factories/cases';
import { mockedUser } from 'factories/users';

describe('CasesTable component', () => {
  const props = {
    records: [mockedNote, mockedAllocationNote, mockedCaseNote],
    user: mockedUser,
  };
  it('should render properly', () => {
    const { asFragment } = render(
      <CasesTable
        {...props}
        columns={['date_of_event', 'formName', 'officer_email', 'action']}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
