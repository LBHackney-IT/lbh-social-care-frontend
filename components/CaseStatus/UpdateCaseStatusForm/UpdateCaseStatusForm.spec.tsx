import UpdateCaseStatusForm from './UpdateCaseStatusForm';
import { residentFactory } from 'factories/residents';
import { fireEvent, render } from '@testing-library/react';

const mockedResident = residentFactory.build();

describe('UpdateCaseStatusForm', () => {
  it('displays the Update child circumstances form for LAC when clicking through from CaseStatusDetails page', () => {
    const { getByText } = render(
      <UpdateCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="update"
        caseStatusType="LAC"
        currentCaseStatusStartDate="2020-10-10"
        prefilledFields={{}}
      />
    );

    expect(getByText("What is the child's legal status?")).toBeInTheDocument();
    expect(
      getByText("What is the child's placement type?")
    ).toBeInTheDocument();
    expect(getByText('When will the change take effect?')).toBeInTheDocument();
  });

  it('displays the Update child circumstances form for LAC when clicking back from ReviewUpdateCaseStatusForm page', () => {
    const { getByText } = render(
      <UpdateCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="update"
        caseStatusType="LAC"
        prefilledFields={{ startDate: '2021-10-10' }}
      />
    );

    expect(getByText("What is the child's legal status?")).toBeInTheDocument();
    expect(
      getByText("What is the child's placement type?")
    ).toBeInTheDocument();
    expect(getByText('When will the change take effect?')).toBeInTheDocument();
  });
});

describe('UpdateCaseStatusForm validations', () => {
  it('prefills the start date with the current case status start date (+1) when updating a LAC', () => {
    const startDate = '2021-01-01';
    const { getByTestId } = render(
      <UpdateCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="update"
        caseStatusType="LAC"
        prefilledFields={{}}
        currentCaseStatusStartDate={startDate}
      />
    );
    const clickDateBox = getByTestId('text-raw-field');
    expect(clickDateBox.getAttribute('value')).toEqual('2021-01-02');
  });

  it('does not disable submit button when scheduled start date is set to be after current active case status start date', async () => {
    const { getByTestId } = render(
      <UpdateCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="update"
        caseStatusType="LAC"
        currentCaseStatusStartDate="2020-10-10"
        prefilledFields={{ startDate: '2021-10-11' }}
      />
    );
    const clickDateBox = getByTestId('text-raw-field');

    fireEvent.click(clickDateBox);
    fireEvent.focusOut(clickDateBox);

    expect(getByTestId('submit_button')).not.toBeDisabled();
  });
});
