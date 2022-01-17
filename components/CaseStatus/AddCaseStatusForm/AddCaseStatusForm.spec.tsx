import AddCaseStatusForm from './AddCaseStatusForm';
import { render, fireEvent } from '@testing-library/react';
import { residentFactory } from 'factories/residents';
import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';

const mockedResident = residentFactory.build();

describe('AddCaseStatusForm - Permissions', () => {
  it('displays CIN type option in the form', () => {
    mockedUser.isInPlacementManagementUnit = false;
    mockedUser.isInSafeguardingReviewing = false;
    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    expect(getByText('Child in need')).toBeInTheDocument();
  });

  it('displays CP type option in the form if user has right permissions', () => {
    mockedUser.isInPlacementManagementUnit = false;
    mockedUser.isInSafeguardingReviewing = true;

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    expect(getByText('Child protection')).toBeInTheDocument();
  });

  it('displays CP type option in the form if user has right permissions', () => {
    mockedUser.isInPlacementManagementUnit = true;
    mockedUser.isInSafeguardingReviewing = true;

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    expect(getByText('Child protection')).toBeInTheDocument();
  });

  it('does not display CP type option in the form if user has wrong permissions', () => {
    mockedUser.isInPlacementManagementUnit = true;
    mockedUser.isInSafeguardingReviewing = false;

    const { queryByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    expect(queryByText('Child protection')).not.toBeInTheDocument();
  });

  it('does not display CP type option in the form if user has wrong permissions', () => {
    mockedUser.isInPlacementManagementUnit = false;
    mockedUser.isInSafeguardingReviewing = false;

    const { queryByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    expect(queryByText('Child protection')).not.toBeInTheDocument();
  });

  it('displays LAC type option in the form if user has right permissions', () => {
    mockedUser.isInPlacementManagementUnit = true;
    mockedUser.isInSafeguardingReviewing = false;

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    expect(getByText('Looked after child')).toBeInTheDocument();
  });

  it('displays LAC type option in the form if user has right permissions', () => {
    mockedUser.isInPlacementManagementUnit = true;
    mockedUser.isInSafeguardingReviewing = true;

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    expect(getByText('Looked after child')).toBeInTheDocument();
  });

  it('does not display LAC type option in the form if user has wrong permissions', () => {
    mockedUser.isInPlacementManagementUnit = false;
    mockedUser.isInSafeguardingReviewing = true;

    const { queryByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    expect(queryByText('Looked after child')).not.toBeInTheDocument();
  });

  it('does not display LAC type option in the form if user has wrong permissions', () => {
    mockedUser.isInPlacementManagementUnit = false;
    mockedUser.isInSafeguardingReviewing = false;

    const { queryByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    expect(queryByText('Looked after child')).not.toBeInTheDocument();
  });
});

describe('AddCaseStatusForm - CIN', () => {
  mockedUser.isInPlacementManagementUnit = false;
  mockedUser.isInSafeguardingReviewing = false;

  it('should disable the submit button when no type has been selected', () => {
    const { getByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    expect(getByTestId('submit_button')).toBeDisabled();
  });

  it('displays start date and notes when selecting CIN', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    fireEvent.click(getByText('Child in need'));

    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Notes')).toBeInTheDocument();
  });

  it('should enable the submit button when completed', () => {
    const { getByTestId } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm
          personId={mockedResident.id}
          prefilledFields={{
            type: 'CIN',
            notes: 'this is a note',
            startDate: '2020-01-01',
          }}
        />
      </UserContext.Provider>
    );

    expect(getByTestId('submit_button')).not.toBeDisabled();
  });

  it('pre-select CIN and fills the other fields', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm
          personId={mockedResident.id}
          prefilledFields={{
            type: 'CIN',
            notes: 'this is a note',
          }}
        />
      </UserContext.Provider>
    );

    expect(getByText('Child in need')).toBeInTheDocument();
    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Notes')).toBeInTheDocument();
    expect(getByText('this is a note')).toBeInTheDocument();
  });
});

describe('AddCaseStatusForm - CP', () => {
  it('does not display category question unless CP is clicked the form', () => {
    mockedUser.isInSafeguardingReviewing = true;

    const { queryByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    expect(
      queryByText('Category of child protection plan')
    ).not.toBeInTheDocument();
  });

  it('displays start date and category question when CP is selected', () => {
    mockedUser.isInSafeguardingReviewing = true;

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    fireEvent.click(getByText('Child protection'));

    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Category of child protection plan')).toBeInTheDocument();
  });

  it('displays the category options when CP is selected', () => {
    mockedUser.isInSafeguardingReviewing = true;

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    fireEvent.click(getByText('Child protection'));

    expect(getByText('Neglect')).toBeInTheDocument();
    expect(getByText('Physical abuse')).toBeInTheDocument();
    expect(getByText('Emotional abuse')).toBeInTheDocument();
    expect(getByText('Sexual abuse')).toBeInTheDocument();
  });

  it('pre-select CP and fills the other fields', () => {
    mockedUser.isInSafeguardingReviewing = true;

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm
          personId={mockedResident.id}
          prefilledFields={{
            type: 'CP',
            category: 'C1',
          }}
        />
      </UserContext.Provider>
    );

    expect(getByText('Child protection')).toBeInTheDocument();
    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText('Neglect')).toBeInTheDocument();
  });
});

describe('AddCaseStatusForm - LAC', () => {
  it('does not display the 2 select drop downs unless LAC radio button is clicked on the form', () => {
    mockedUser.isInPlacementManagementUnit = true;

    const { queryByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );
    expect(queryByText('Looked after child')).toBeInTheDocument();
    expect(
      queryByText("What is the child's legal status?")
    ).not.toBeInTheDocument();
    expect(queryByText('What is the placement type?')).not.toBeInTheDocument();
  });

  it('should enable the drop down elements when LAC is selected', () => {
    mockedUser.isInPlacementManagementUnit = true;

    const { getByTestId, queryByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm
          personId={mockedResident.id}
          prefilledFields={{
            type: 'LAC',
            startDate: '2020-01-01',
          }}
        />
      </UserContext.Provider>
    );
    expect(queryByText('Looked after child')).toBeInTheDocument();
    expect(getByTestId('legalStatus')).not.toBeDisabled();
    expect(getByTestId('placementType')).not.toBeDisabled();
  });

  it('displays start date and drop down questions when LAC is selected', () => {
    mockedUser.isInPlacementManagementUnit = true;

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <AddCaseStatusForm personId={mockedResident.id} prefilledFields={{}} />
      </UserContext.Provider>
    );

    fireEvent.click(getByText('Looked after child'));

    expect(getByText('Looked after child')).toBeInTheDocument();
    expect(getByText('Start Date')).toBeInTheDocument();
    expect(getByText("What is the child's legal status?")).toBeInTheDocument();
    expect(getByText('What is the placement type?')).toBeInTheDocument();
  });
});
