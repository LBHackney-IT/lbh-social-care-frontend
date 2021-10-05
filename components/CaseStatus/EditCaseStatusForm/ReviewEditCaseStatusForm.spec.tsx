import ReviewEditCaseStatusForm from './ReviewEditCaseStatusForm';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('ReviewEditCaseStatusForm', () => {
  it('displays the form CIN - edit', () => {
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
  it('displays the form - CP edit', () => {
    const { getByText } = render(
      <ReviewEditCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusId={123}
        caseStatusType="CP"
        action="edit"
        formAnswers={{
          startDate: '2020-12-01',
          category: 'C1',
        }}
      />
    );

    expect(getByText('Review case status details')).toBeInTheDocument();
    expect(getByText('Child protection')).toBeInTheDocument();
    expect(getByText('Neglect')).toBeInTheDocument();
    expect(
      getByText('Do you want to edit this case status?')
    ).toBeInTheDocument();
  });
  it('displays the form - LAC edit', () => {
    const { getByText } = render(
      <ReviewEditCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusId={123}
        caseStatusType="LAC"
        action="edit"
        formAnswers={{
          startDate: '2020-12-01',
          placementReason: 'H5',
          legalStatus: 'C2',
        }}
      />
    );

    expect(getByText('Review case status details')).toBeInTheDocument();
    expect(getByText('Looked after child')).toBeInTheDocument();
    expect(
      getByText(
        'H5: Semi-independent living accommodation not subject to children’s homes regulations'
      )
    ).toBeInTheDocument();
    expect(getByText('C2: Full care order')).toBeInTheDocument();
    expect(
      getByText('Do you want to edit this case status?')
    ).toBeInTheDocument();
  });

  it('displays the form CIN - end', () => {
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
    expect(getByText('01 Dec 2020')).toBeInTheDocument();
    expect(
      getByText('Do you want to end this case status?')
    ).toBeInTheDocument();
  });

  it('displays the form CP - end', () => {
    const { getByText } = render(
      <ReviewEditCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusType="CP"
        caseStatusId={123}
        action="end"
        formAnswers={{
          endDate: '2020-12-01',
        }}
      />
    );

    expect(getByText('Review case status details')).toBeInTheDocument();
    expect(getByText('01 Dec 2020')).toBeInTheDocument();
    expect(
      getByText('Do you want to end this case status?')
    ).toBeInTheDocument();
  });

  it('displays the form LAC - end', () => {
    const { getByText } = render(
      <ReviewEditCaseStatusForm
        title="Review case status details"
        personId={mockedResident.id}
        caseStatusType="LAC"
        caseStatusId={123}
        action="end"
        formAnswers={{
          endDate: '2020-12-01',
          episodeReason: 'E4A',
        }}
      />
    );

    expect(getByText('Review case status details')).toBeInTheDocument();
    expect(getByText('01 Dec 2020')).toBeInTheDocument();
    expect(
      getByText(
        'E4A: Returned home to live with parent(s), relative(s), or other person(s) with parental responsibility as part of the care planning process (not under a special guardianship order or residence order or (from 22 April 2014) a child arrangement order).'
      )
    ).toBeInTheDocument();
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
    expect(getByText('01 Dec 2020')).toBeInTheDocument();
  });
});
