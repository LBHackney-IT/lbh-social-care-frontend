import ReviewUpdateCaseStatusForm from './ReviewUpdateCaseStatusForm';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('ReviewUpdateCaseStatusForm', () => {
  it('displays the LAC form - update', () => {
    const { getByText } = render(
      <ReviewUpdateCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusType="LAC"
        caseStatusId={123}
        action="update"
        formAnswers={{
          startDate: '2020-12-04',
          legalStatus: 'L1',
          placementReason: 'P3',
        }}
      />
    );

    expect(getByText('Case status')).toBeInTheDocument();
    expect(getByText('Date the changes will take effect')).toBeInTheDocument();
    expect(getByText('New legal status')).toBeInTheDocument();
    expect(getByText('New placement type')).toBeInTheDocument();
    expect(getByText('04 Dec 2020')).toBeInTheDocument();
    expect(
      getByText(
        'L1: Under police protection and in local authority accommodation'
      )
    ).toBeInTheDocument();
    expect(getByText('P3: Residential employment')).toBeInTheDocument();
  });
});
