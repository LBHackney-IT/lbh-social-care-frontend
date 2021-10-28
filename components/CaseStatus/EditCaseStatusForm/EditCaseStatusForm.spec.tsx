import EditCaseStatusForm from './EditCaseStatusForm';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('EditCaseStatusForm', () => {
  it('displays the Edit form for CIN', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="edit"
        caseStatusType="CIN"
        prefilledFields={{
          notes: 'Edit me',
        }}
        currentCaseStatusStartDate="2021-01-01"
      />
    );

    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Notes')).toBeInTheDocument();
    expect(getByText('Edit me')).toBeInTheDocument();
  });

  it('displays the End form for CIN', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="end"
        caseStatusType="CIN"
        prefilledFields={{}}
        currentCaseStatusStartDate="2021-01-01"
      />
    );

    expect(getByText('End Date')).toBeInTheDocument();
  });

  it('displays the Edit form for CP', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="edit"
        caseStatusType="CP"
        prefilledFields={{
          category: 'C3',
        }}
        currentCaseStatusStartDate="2021-01-01"
      />
    );

    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Category of child protection plan')).toBeInTheDocument();
    expect(getByText('Emotional abuse')).toBeInTheDocument();
  });

  it('displays the End form for CP', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="edit"
        caseStatusType="CP"
        prefilledFields={{}}
        currentCaseStatusStartDate="2021-01-01"
      />
    );

    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Category of child protection plan')).toBeInTheDocument();
  });

  it('displays the Edit form for LAC', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="edit"
        caseStatusType="LAC"
        prefilledFields={{}}
        currentCaseStatusStartDate="2021-01-01"
      />
    );

    expect(getByText('Start Date'));
    expect(getByText("What is the child's legal status?")).toBeInTheDocument();
    expect(
      getByText("What is the child's placement type?")
    ).toBeInTheDocument();
  });

  it('displays the End form for LAC', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="end"
        caseStatusType="LAC"
        prefilledFields={{}}
        currentCaseStatusStartDate="2021-01-01"
      />
    );

    expect(getByText('End Date')).toBeInTheDocument();
    expect(
      getByText('What is the reason for the episode ending?')
    ).toBeInTheDocument();
  });
  it('displays the End form for LAC', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="end"
        caseStatusType="LAC"
        prefilledFields={{}}
        currentCaseStatusStartDate="2021-01-01"
      />
    );

    expect(getByText('End Date')).toBeInTheDocument();
    expect(
      getByText('What is the reason for the episode ending?')
    ).toBeInTheDocument();
  });

  it('prefills the start date with the current case status start date', () => {
    const startDate = '2021-01-01';
    const { getByTestId, getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="edit"
        caseStatusType="LAC"
        prefilledFields={{}}
        currentCaseStatusStartDate={startDate}
      />
    );
    expect(getByText('Start Date')).toBeInTheDocument();

    const clickDateBox = getByTestId('text-raw-field');
    expect(clickDateBox.getAttribute('value')).toEqual(startDate);
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
        currentCaseStatusStartDate="2021-01-01"
      />
    );
    expect(getByTestId('submit_button')).not.toBeDisabled();
  });
});
