import { fireEvent, render, screen } from '@testing-library/react';
import { MashResident, Resident, UpdateMashResidentData } from 'types';
import { updateMashResident } from 'utils/api/mashResident';
import ContactTable from './MatchBanner';

jest.mock('utils/api/mashResident');

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: JSX.Element }) =>
      children
);

describe('#ContactTable', () => {
  const mockMatch = {
    id: 123,
    firstName: 'Jan',
    lastName: 'Smith',
    dateOfBirth: '09/12/1972',
    address: {
      address: '100 Narfort Lane, Hackney, London',
      postcode: 'SW1 1TS',
    },
  } as Resident;

  const mockMashResident = {
    id: 1111111,
    firstName: 'January',
    lastName: 'Smith',
    dateOfBirth: '09/12/1972',
    address: '10 Narfort Lane, Hackney, London',
    postcode: 'SW1 1TS',
  } as MashResident;

  beforeEach(() => {
    jest.resetAllMocks;

    render(
      <ContactTable
        potentialMatch={mockMatch}
        mashResident={mockMashResident}
      />
    );
  });

  it('should render correctly', () => {
    expect(screen.getByText('Potential matches'));
  });

  it('should call updateMashResident when the link person button is clicked', () => {
    const firstRowLinkPersonButton = screen.getAllByText('Link person')[0];

    (updateMashResident as jest.Mock).mockResolvedValue(true);

    const expectedLinkRequest: UpdateMashResidentData = {
      id: mockMashResident.id,
      socialCareId: mockMatch.id,
      updateType: null,
    };

    // Click on first Link person button on page
    // since we are using dummy data in the main code
    fireEvent.click(firstRowLinkPersonButton);

    expect(updateMashResident).toHaveBeenNthCalledWith(
      1,
      expectedLinkRequest,
      mockMashResident.id
    );
  });

  it('should call updateMashResident when undo linking person button is clicked', () => {
    const firstRowLinkPersonButton = screen.getAllByText('Link person')[0];

    (updateMashResident as jest.Mock).mockResolvedValue(true);
    fireEvent.click(firstRowLinkPersonButton);

    const expectedUnlinkRequest: UpdateMashResidentData = {
      id: mockMashResident.id,
      updateType: 'UNLINK-PERSON',
    };

    expect(screen.getByText('Undo linking.'));

    fireEvent.click(screen.getByText('Undo linking.'));

    expect(updateMashResident).toHaveBeenNthCalledWith(
      2,
      expectedUnlinkRequest,
      mockMashResident.id
    );
  });
});
