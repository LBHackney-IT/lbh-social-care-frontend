import EditCaseStatusForm from './EditCaseStatusForm';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('EditCaseStatusForm', () => {
  it('displays the End form for CIN', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="end"
        caseStatusType="CIN"
        prefilledFields={{}}
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
        prefilledFields={{}}
      />
    );

    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Category of child protection plan')).toBeInTheDocument();
  });
  it('displays the Edit form for CIN', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="edit"
        caseStatusType="CIN"
        prefilledFields={{}}
      />
    );

    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Notes')).toBeInTheDocument();
  });
  it('displays the Edit form for LAC', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="edit"
        caseStatusType="LAC"
        prefilledFields={{}}
      />
    );

    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText("What is the child's legal status?")).toBeInTheDocument();
  });

  it('displays the Update form for LAC', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="update"
        caseStatusType="LAC"
        prefilledFields={{}}
      />
    );
  });

  it('displays the Update form for LAC', () => {
    const { getByText } = render(
      <EditCaseStatusForm
        personId={mockedResident.id}
        caseStatusId={123}
        action="update"
        caseStatusType="LAC"
        prefilledFields={{}}
      />
    );
    expect(
      getByText("What is the child's placement reason?")
    ).toBeInTheDocument();
    expect(getByText('When will the change take effect?')).toBeInTheDocument();
  });

  expect(
    getByText("What is the child's placement reason?")
  ).toBeInTheDocument();
  expect(getByText('When will the change take effect?')).toBeInTheDocument();
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
    />
  );
  expect(getByTestId('submit_button')).not.toBeDisabled();
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
      />
    );
    expect(getByTestId('submit_button')).not.toBeDisabled();
  });
});
