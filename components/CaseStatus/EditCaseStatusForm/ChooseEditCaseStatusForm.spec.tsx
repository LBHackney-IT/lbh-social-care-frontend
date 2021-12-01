import ChooseEditCaseStatusForm from './ChooseEditCaseStatusForm';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('ChooseEditCaseStatusForm - CIN', () => {
  it('displays the form', () => {
    const { getByText } = render(
      <ChooseEditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        caseStatusType="CIN"
        prefilledValue={''}
      />
    );

    expect(getByText('I need to make a correction')).toBeInTheDocument();
  });

  it('does not displays "update the circumstances" for CIN', () => {
    const { queryByText } = render(
      <ChooseEditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        caseStatusType="CIN"
        prefilledValue={''}
      />
    );

    expect(
      queryByText('I need to update the circumstances')
    ).not.toBeInTheDocument();
  });
  it('displays "update the circumstances" for CP', () => {
    const { getByText } = render(
      <ChooseEditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        caseStatusType="CP"
        prefilledValue={''}
      />
    );

    expect(getByText('I need to update the circumstances')).toBeInTheDocument();
  });
  it('displays "update the circumstances" for LAC', () => {
    const { getByText } = render(
      <ChooseEditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        caseStatusType="LAC"
        prefilledValue={''}
      />
    );

    expect(getByText('I need to update the circumstances')).toBeInTheDocument();
  });

  it('should disable the submit button when not completed', () => {
    const { getByTestId } = render(
      <ChooseEditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        caseStatusType="CP"
        prefilledValue={''}
      />
    );

    expect(getByTestId('submit_button')).toBeDisabled();
  });

  it('should enable the submit button when completed', () => {
    const { getByTestId } = render(
      <ChooseEditCaseStatusForm
        personId={mockedResident.id}
        caseStatusType="CIN"
        caseStatusId={123}
        prefilledValue={'end'}
      />
    );
    expect(getByTestId('submit_button')).not.toBeDisabled();
  });
});
