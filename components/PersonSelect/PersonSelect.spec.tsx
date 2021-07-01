import PersonSelect from './PersonSelect';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  legacyResidentFactory,
  mockedLegacyResident,
  mockedResident,
  residentFactory,
} from 'factories/residents';

describe('PersonSelect', () => {
  it('should render properly', () => {
    const { asFragment } = render(
      <PersonSelect
        label="Matching people"
        people={[mockedResident]}
        idToAdd={mockedResident.id}
        setIdToAdd={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles when no people are found', () => {
    render(
      <PersonSelect
        label="Matching people"
        people={[]}
        idToAdd={0}
        setIdToAdd={jest.fn()}
      />
    );

    expect(screen.getByText('No results'));
  });

  it('should call the setIdToAdd callback with the id of the selected resident', () => {
    const mockSetIdToAdd = jest.fn();
    mockSetIdToAdd.mockReturnValue(mockedResident.id);

    const { container } = render(
      <PersonSelect
        label="Matching people"
        people={[mockedResident]}
        idToAdd={0}
        setIdToAdd={mockSetIdToAdd}
      />
    );

    const input = container.querySelector('input');
    input && fireEvent.click(input);

    expect(mockSetIdToAdd).toBeCalledWith(mockedResident.id);
  });

  it('checks the radio button if the id matches the residents id', () => {
    const { container: containerChecked } = render(
      <PersonSelect
        label="Matching people"
        people={[mockedResident]}
        idToAdd={mockedResident.id}
        setIdToAdd={jest.fn()}
      />
    );

    const { container: containerUnchecked } = render(
      <PersonSelect
        label="Matching people"
        people={[mockedResident]}
        idToAdd={0}
        setIdToAdd={jest.fn()}
      />
    );

    expect(containerChecked.querySelector('input')?.checked).toBe(true);
    expect(containerUnchecked.querySelector('input')?.checked).toBe(false);
  });

  it("correctly formats a Resident person's details", () => {
    render(
      <PersonSelect
        label="Matching people"
        people={[mockedResident]}
        idToAdd={mockedResident.id}
        setIdToAdd={jest.fn()}
      />
    );
    expect(
      screen.getByText(
        `#${mockedResident.id} · Born 13 Nov 2020 · ${mockedResident.address?.address}`
      )
    );
    expect(screen.getAllByRole('radio').length).toBe(1);
  });

  it("correctly formats a Resident person's details when their address is undefined", () => {
    const resident = residentFactory.build();
    resident.address = undefined;
    render(
      <PersonSelect
        label="Matching people"
        people={[resident]}
        idToAdd={resident.id}
        setIdToAdd={jest.fn()}
      />
    );
    expect(screen.getByText(`#${resident.id} · Born 13 Nov 2020`));
    expect(screen.getAllByRole('radio').length).toBe(1);
  });

  it("correctly formats a Resident person's details when their date of birth is undefined", () => {
    const resident = residentFactory.build();
    resident.dateOfBirth = undefined;
    render(
      <PersonSelect
        label="Matching people"
        people={[resident]}
        idToAdd={resident.id}
        setIdToAdd={jest.fn()}
      />
    );
    expect(screen.getByText(`#${resident.id} · ${resident.address?.address}`));
    expect(screen.getAllByRole('radio').length).toBe(1);
  });

  it("correctly formats a Legacy Resident person's details", () => {
    render(
      <PersonSelect
        label="Matching people"
        people={[mockedLegacyResident]}
        idToAdd={parseInt(mockedLegacyResident.mosaicId)}
        setIdToAdd={jest.fn()}
      />
    );
    expect(
      screen.getByText(
        `#${mockedResident.id} · Born 13 Nov 2020 · ${mockedResident.address?.address}`
      )
    );
    expect(screen.getAllByRole('radio').length).toBe(1);
  });

  it("correctly formats a Legacy Resident person's details when their address is undefined", () => {
    const resident = legacyResidentFactory.build();
    resident.address = undefined;
    render(
      <PersonSelect
        label="Matching people"
        people={[resident]}
        idToAdd={parseInt(resident.mosaicId)}
        setIdToAdd={jest.fn()}
      />
    );
    expect(screen.getByText(`#${resident.mosaicId} · Born 13 Nov 2020`));
    expect(screen.getAllByRole('radio').length).toBe(1);
  });

  //   TODO: Actually manage and submit state, once we have reason for that sort of thing

  // test when no resident
  // test correct information is shown for a resident
  // test we call setIdToAdd correctly
});
