import UpdateCaseStatusForm from './UpdateCaseStatusForm';
import { residentFactory } from 'factories/residents';
import { act, fireEvent, render } from '@testing-library/react';

const mockedResident = residentFactory.build();

describe('UpdateCaseStatusForm', () => {
  it('displays the Update child circumstances form for LAC', () => {
    const { getByText } = render(
      <UpdateCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="update"
        caseStatusType="LAC"
        prefilledFields={{}}
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
  it('display validation text and disables submit button when scheduled start date is set to be on or before current active case status start date', async () => {
    const { getByText, getByTestId } = render(
      <UpdateCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="update"
        caseStatusType="LAC"
        currentCaseStatusStartDate="2020-10-10"
        prefilledFields={{ startDate: '2021-10-10' }}
      />
    );
    const clickDateBox = getByTestId('text-raw-field');

    await act(async () => {
      fireEvent.click(clickDateBox);
      fireEvent.focusOut(clickDateBox);
    });

    expect(getByText('Date cannot be before start date')).toBeInTheDocument();
    expect(getByTestId('submit_button')).toBeDisabled();
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

    await act(async () => {
      fireEvent.click(clickDateBox);
      fireEvent.focusOut(clickDateBox);
    });

    expect(getByTestId('submit_button')).not.toBeDisabled();
  });
});
