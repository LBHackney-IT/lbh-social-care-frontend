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

  it('should disable the submit button when not completed', () => {
    const { getByTestId } = render(
      <ChooseEditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        caseStatusType="CIN"
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
