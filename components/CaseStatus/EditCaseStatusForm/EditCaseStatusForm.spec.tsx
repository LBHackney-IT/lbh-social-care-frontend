import EditCaseStatusForm from './EditCaseStatusForm';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('EditCaseStatusForm - CIN', () => {
  it('displays the End form', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="end"
        caseStatusType="CIN"
        prefilledFields={{}}
      />
    );

    expect(getByText('End Date')).toBeInTheDocument();
  });

  it('displays the Edit form', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="edit"
        caseStatusType="CIN"
        prefilledFields={{}}
      />
    );

    expect(getByText('Start Date')).toBeInTheDocument();
  });

  it('should enable the submit button when completed', () => {
    const { getByTestId } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="edit"
        caseStatusType="CIN"
        prefilledFields={{
          notes: 'this is a note',
          startDate: '2020-01-01',
        }}
      />
    );
    expect(getByTestId('submit_button')).not.toBeDisabled();
  });
});
