import UpdateCaseStatusForm from './UpdateCaseStatusForm';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

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
