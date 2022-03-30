import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import CustomAddressEditor from './CustomAddressEditor';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

const mockClose = jest.fn();

jest.mock('axios');

(global.fetch as jest.Mock) = jest.fn(() => ({
  status: 200,
}));

describe('CustomAddressEditor', () => {
  it('can be closed correctly', () => {
    render(
      <CustomAddressEditor
        name="address"
        label="Address"
        onClose={mockClose}
        resident={mockedResident}
      />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockClose).toBeCalled();
  });

  it('responds to the ESC key', () => {
    render(
      <CustomAddressEditor
        name="address"
        label="Address"
        onClose={mockClose}
        resident={mockedResident}
      />
    );

    fireEvent.keyUp(screen.getByRole('group'), { key: 'Escape' });
    expect(mockClose).toBeCalled();
  });

  it('shows the existing address, when it exists ', () => {
    render(
      <CustomAddressEditor
        name="address"
        label="Address"
        onClose={mockClose}
        resident={mockedResident}
      />
    );
    expect(screen.queryByText('Enter manually')).toBeNull();
  });

  it("doesn't show the fields for manual address entry if they're blank", () => {
    render(
      <CustomAddressEditor
        name="address"
        label="Address"
        onClose={mockClose}
        resident={{
          ...mockedResident,
          address: undefined,
        }}
      />
    );
    expect(screen.getByText('Enter manually'));
  });

  it('can search for a postcode', async () => {
    render(
      <CustomAddressEditor
        name="address"
        label="Address"
        onClose={mockClose}
        resident={{
          ...mockedResident,
          address: undefined,
        }}
      />
    );

    userEvent.type(screen.getByLabelText('Building number or name'), '1');
    userEvent.type(screen.getByLabelText('Postcode'), 'Town St');
    await waitFor(() => fireEvent.click(screen.getByText('Find address')));
    expect(axios.get).toBeCalledWith('/api/postcode/Town St?buildingNumber=1');
    expect(screen.getAllByLabelText('Postcode').length).toBe(2);
  });

  it('allows manual entry of an address', () => {
    render(
      <CustomAddressEditor
        name="address"
        label="Address"
        onClose={mockClose}
        resident={{
          ...mockedResident,
          address: undefined,
        }}
      />
    );
    fireEvent.click(screen.getByText('Enter manually'));
    expect(screen.getAllByLabelText('Postcode').length).toBe(2);
    expect(screen.queryByText('Enter manually')).toBeNull();
  });

  it('submits an address correctly', async () => {
    render(
      <CustomAddressEditor
        name="address"
        label="Address"
        onClose={mockClose}
        resident={mockedResident}
      />
    );
    fireEvent.change(screen.getAllByLabelText('Postcode')[1], {
      target: { value: 'A1 1AA' },
    });
    await waitFor(() => fireEvent.click(screen.getByText('Save')));

    expect(global.fetch).toBeCalledWith('/api/residents/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: {
          ...mockedResident.address,
          postcode: 'A1 1AA',
          uprn: null,
        },
      }),
    });
  });
});
