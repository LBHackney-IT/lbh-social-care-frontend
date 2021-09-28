import AddCaseStatusForm from './AddCaseStatusForm';
import { render, fireEvent } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('AddCaseStatusForm - CIN', () => {
  it('displays CIN type option in the form', () => {
    const { getByText } = render(
      <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
    );

    expect(getByText('Child in need')).toBeInTheDocument();
  });

  it('should disable the submit button when no type has been selected', () => {
    const { getByTestId } = render(
      <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
    );

    expect(getByTestId('submit_button')).toBeDisabled();
  });

  it('displays start date and notes when selecting CIN', () => {
    const { getByText } = render(
      <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
    );

    fireEvent.click(getByText('Child in need'));

    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Notes')).toBeInTheDocument();
  });

  it('should enable the submit button when completed', () => {
    const { getByTestId } = render(
      <AddCaseStatusForm
        personId={mockedResident.id}
        prefilledFields={{
          type: 'CIN',
          notes: 'this is a note',
          startDate: '2020-01-01',
        }}
      />
    );

    expect(getByTestId('submit_button')).not.toBeDisabled();
  });

  it('pre-select CIN and fills the other fields', () => {
    const { getByText } = render(
      <AddCaseStatusForm
        personId={mockedResident.id}
        prefilledFields={{
          type: 'CIN',
          notes: 'this is a note',
        }}
      />
    );

    expect(getByText('Child in need')).toBeInTheDocument();
    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Notes')).toBeInTheDocument();
    expect(getByText('this is a note')).toBeInTheDocument();
  });
});

describe('AddCaseStatusForm - CP', () => {
  it('displays the form', () => {
    const { getByText } = render(
      <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
    );

    expect(getByText('Child protection')).toBeInTheDocument();
  });

  it('does not display category question unless CP is clicked the form', () => {
    const { queryByText } = render(
      <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
    );

    expect(
      queryByText('Category of child protection plan')
    ).not.toBeInTheDocument();
  });

  it('displays start date and category question when CP is selected', () => {
    const { getByText } = render(
      <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
    );

    fireEvent.click(getByText('Child protection'));

    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Category of child protection plan')).toBeInTheDocument();
  });

  it('displays the category options when CP is selected', () => {
    const { getByText } = render(
      <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
    );

    fireEvent.click(getByText('Child protection'));

    expect(getByText('Neglect')).toBeInTheDocument();
    expect(getByText('Physical abuse')).toBeInTheDocument();
    expect(getByText('Emotional abuse')).toBeInTheDocument();
    expect(getByText('Sexual abuse')).toBeInTheDocument();
  });

  it('pre-select CP and fills the other fields', () => {
    const { getByText } = render(
      <AddCaseStatusForm
        personId={mockedResident.id}
        prefilledFields={{
          type: 'CP',
          category: 'C1',
        }}
      />
    );

    expect(getByText('Child protection')).toBeInTheDocument();
    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Neglect')).toBeInTheDocument();
  });
});
