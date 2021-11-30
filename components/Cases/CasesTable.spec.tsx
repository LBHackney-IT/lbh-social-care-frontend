import { render } from '@testing-library/react';

import CasesTable from './CasesTable';
import {
  mockedNote,
  mockedCaseNote,
  mockedAllocationNote,
  mockedDeletedCaseNote,
} from 'factories/cases';
import { mockedUser } from 'factories/users';

describe('CasesTable component', () => {
  it('should render properly', () => {
    const props = {
      records: [mockedNote, mockedAllocationNote, mockedCaseNote],
      user: mockedUser,
    };

    const { asFragment } = render(
      <CasesTable
        {...props}
        columns={['date_of_event', 'formName', 'officer_email', 'action']}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not display deleted case notes for non admin users', () => {
    mockedUser.hasAdminPermissions = false;
    mockedUser.hasDevPermissions = false;
    const props = {
      records: [
        mockedNote,
        mockedAllocationNote,
        mockedCaseNote,
        mockedDeletedCaseNote,
      ],
      user: mockedUser,
    };

    const { asFragment } = render(
      <CasesTable
        {...props}
        columns={['date_of_event', 'formName', 'officer_email', 'action']}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should display deleted case notes for admin users', () => {
    mockedUser.hasAdminPermissions = true;
    mockedUser.hasDevPermissions = true;
    const props = {
      records: [
        mockedNote,
        mockedAllocationNote,
        mockedCaseNote,
        mockedDeletedCaseNote,
      ],
      user: mockedUser,
    };

    const { asFragment, getByText } = render(
      <CasesTable
        {...props}
        columns={['date_of_event', 'formName', 'officer_email', 'action']}
      />
    );
    expect(getByText(/(deleted)/)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
