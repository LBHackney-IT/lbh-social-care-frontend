import ReviewEditCaseStatusForm from './ReviewEditCaseStatusForm';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('ReviewEditCaseStatusForm', () => {
  it('displays the CIN form - edit', () => {
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
    expect(getByText('Child in need')).toBeInTheDocument();
    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('01 Dec 2020')).toBeInTheDocument();
    expect(getByText('blabla')).toBeInTheDocument();
    expect(
      getByText('Do you want to edit this case status?')
    ).toBeInTheDocument();
  });

  it('displays the CIN form - end', () => {
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
    expect(getByText('Child in need')).toBeInTheDocument();
    expect(getByText('End Date')).toBeInTheDocument();
    expect(getByText('01 Dec 2020')).toBeInTheDocument();
    expect(
      getByText('Do you want to end this case status?')
    ).toBeInTheDocument();
  });

  it('displays the CP form - edit', () => {
    const { getByText } = render(
      <ReviewEditCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusId={123}
        caseStatusType="CP"
        action="edit"
        formAnswers={{
          startDate: '2020-12-02',
          category: 'C1',
        }}
      />
    );

    expect(getByText('Review case status details')).toBeInTheDocument();
    expect(getByText('Child protection')).toBeInTheDocument();
    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('02 Dec 2020')).toBeInTheDocument();
    expect(getByText('Neglect')).toBeInTheDocument();
    expect(
      getByText('Do you want to edit this case status?')
    ).toBeInTheDocument();
  });

  it('displays the CP form - end', () => {
    const { getByText } = render(
      <ReviewEditCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusType="CP"
        caseStatusId={123}
        action="end"
        formAnswers={{
          endDate: '2020-12-02',
        }}
      />
    );

    expect(getByText('Review case status details')).toBeInTheDocument();
    expect(getByText('Child protection')).toBeInTheDocument();
    expect(getByText('End Date')).toBeInTheDocument();
    expect(getByText('02 Dec 2020')).toBeInTheDocument();
    expect(
      getByText('Do you want to end this case status?')
    ).toBeInTheDocument();
  });

  it('displays the LAC form - edit', () => {
    const { getByText } = render(
      <ReviewEditCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusId={123}
        caseStatusType="LAC"
        action="edit"
        formAnswers={{
          startDate: '2020-12-03',
          legalStatus: 'D1',
          placementReason: 'K1',
        }}
      />
    );

    expect(getByText('Review case status details')).toBeInTheDocument();
    expect(getByText('Looked after child')).toBeInTheDocument();
    expect(getByText('03 Dec 2020')).toBeInTheDocument();
    expect(getByText('D1: Freeing order granted')).toBeInTheDocument();
    expect(getByText('K1: Secure children’s homes')).toBeInTheDocument();
    expect(
      getByText('Do you want to edit this case status?')
    ).toBeInTheDocument();
  });

  it('displays the LAC form - end', () => {
    const { getByText } = render(
      <ReviewEditCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusType="LAC"
        caseStatusId={123}
        action="end"
        formAnswers={{
          endDate: '2020-12-03',
          episodeReason: 'E12',
        }}
      />
    );

    expect(getByText('Review case status details')).toBeInTheDocument();
    expect(getByText('Looked after child')).toBeInTheDocument();
    expect(getByText('End Date')).toBeInTheDocument();
    expect(
      getByText('E12: Adopted – consent dispensed with by the court')
    ).toBeInTheDocument();
    expect(
      getByText('Do you want to end this case status?')
    ).toBeInTheDocument();
  });
});
