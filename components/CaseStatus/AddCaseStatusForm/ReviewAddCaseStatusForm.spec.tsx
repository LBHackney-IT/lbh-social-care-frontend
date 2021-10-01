import ReviewAddCaseStatusForm from './ReviewAddCaseStatusForm';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('ReviewAddRelationshipForm', () => {
  it('displays the form name', () => {
    const { getByText } = render(
      <ReviewAddCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        formAnswers={{
          type: 'CIN',
          startDate: '2020-12-01',
          notes: 'blabla',
        }}
      />
    );

    expect(getByText('Review case status details')).toBeInTheDocument();
    expect(
      getByText('Do you want to add this case status?')
    ).toBeInTheDocument();
  });

  it('displays type, date and notes', () => {
    const { getByText } = render(
      <ReviewAddCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        formAnswers={{
          type: 'CIN',
          startDate: '2020-12-01',
          notes: 'blabla',
        }}
      />
    );

    expect(getByText('Child in need')).toBeInTheDocument();
    expect(getByText('blabla')).toBeInTheDocument();
    expect(getByText('01 Dec 2020')).toBeInTheDocument();
  });

  it('displays type and date when CP is selected', () => {
    const { getByText } = render(
      <ReviewAddCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        formAnswers={{
          type: 'CP',
          startDate: '2020-12-01',
          category: 'C1',
        }}
      />
    );

    expect(getByText('Child protection')).toBeInTheDocument();
    expect(getByText('01 Dec 2020')).toBeInTheDocument();
  });

  it('displays selected category when CP is selected', () => {
    const { getByText } = render(
      <ReviewAddCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        formAnswers={{
          type: 'CP',
          startDate: '2020-12-01',
          category: 'C1',
        }}
      />
    );

    expect(getByText('Neglect')).toBeInTheDocument();
    expect(getByText('01 Dec 2020')).toBeInTheDocument();
  });
});
