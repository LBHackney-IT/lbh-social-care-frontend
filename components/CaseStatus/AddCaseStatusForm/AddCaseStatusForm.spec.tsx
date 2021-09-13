import AddCaseStatusForm from './AddCaseStatusForm';
import { render, fireEvent } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('ReviewAddRelationshipForm - CIN', () => {
  it('displays the form', () => {
    const { getByText } = render(
      <AddCaseStatusForm personId={mockedResident.id} prefilledField={{}} />
    );

    expect(getByText('Child in need')).toBeInTheDocument();
  });

  it('displays start date and notes when selecting CIN', () => {
    const { getByText } = render(
      <AddCaseStatusForm personId={mockedResident.id} prefilledField={{}} />
    );

    fireEvent.click(getByText('Child in need'));

    expect(getByText('Child in need')).toBeInTheDocument();
    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Notes')).toBeInTheDocument();
  });

  it('pre-select CIN and fills the other fields', () => {
    const { getByText } = render(
      <AddCaseStatusForm
        personId={mockedResident.id}
        prefilledField={{
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
