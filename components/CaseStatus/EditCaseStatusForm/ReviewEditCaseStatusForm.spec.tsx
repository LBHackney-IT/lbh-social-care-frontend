import ReviewEditCaseStatusForm from './ReviewEditCaseStatusForm';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('ReviewEditCaseStatusForm', () => {
  it('displays the form - edit', () => {
    const { getByText } = render(
      <ReviewEditCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusId={123}
        caseStatusType="CIN"
        action="edit"
        formAnswers={{
          startDate: '2020-12-01',
          notes: 'blabla',
        }}
      />
    );

    expect(getByText('Review case status details')).toBeInTheDocument();
    expect(getByText('blabla')).toBeInTheDocument();
    expect(
      getByText('Do you want to edit this case status?')
    ).toBeInTheDocument();
  });

  it('displays the form - end', () => {
    const { getByText } = render(
      <ReviewEditCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusType="CIN"
        caseStatusId={123}
        action="end"
        formAnswers={{
          endDate: '2020-12-01',
        }}
      />
    );

    expect(getByText('Review case status details')).toBeInTheDocument();
    expect(getByText('2020-12-01')).toBeInTheDocument();
    expect(
      getByText('Do you want to end this case status?')
    ).toBeInTheDocument();
  });

  it('displays start date and notes for the edit', () => {
    const { getByText } = render(
      <ReviewEditCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusType="CIN"
        caseStatusId={123}
        action="edit"
        formAnswers={{
          startDate: '2020-12-01',
          notes: 'blabla',
        }}
      />
    );

    expect(getByText('blabla')).toBeInTheDocument();
    expect(getByText('2020-12-01')).toBeInTheDocument();
  });
});
