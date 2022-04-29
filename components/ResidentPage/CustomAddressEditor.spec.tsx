import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import CustomAddressEditor from './CustomAddressEditor';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import {
  addressesAPI3and4WrapperFactory,
  addressesAPIWrapperFactory,
} from 'factories/postcode';

const mockClose = jest.fn();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
    expect(mockedAxios.get).toBeCalledWith(
      '/api/postcode/Town St?page=1&buildingNumber=1'
    );
    expect(screen.getAllByLabelText('Postcode').length).toBe(2);
  });

  it('can show multiple results for a postcode search', async () => {
    const mocked_results = addressesAPIWrapperFactory.build();
    mockedAxios.get.mockResolvedValue({
      data: mocked_results,
    });

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
    expect(mockedAxios.get).toBeCalledWith(
      '/api/postcode/Town St?page=1&buildingNumber=1'
    );

    const addressDropDown = screen.getByRole('combobox');
    expect(addressDropDown).not.toBeNull();
    expect(addressDropDown.childElementCount).toBe(
      mocked_results.address.length
    );

    const expectedAddress = screen.getByText('test line1');
    expect(expectedAddress).not.toBeNull();
    expect(expectedAddress).toBeInTheDocument();
  });

  it('populates the address fields with a selected address', async () => {
    const mocked_results = addressesAPIWrapperFactory.build();
    mockedAxios.get.mockResolvedValue({
      data: mocked_results,
    });

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
    expect(mockedAxios.get).toBeCalledWith(
      '/api/postcode/Town St?page=1&buildingNumber=1'
    );

    const addressDropDown = screen.getByRole('combobox');
    expect(addressDropDown).not.toBeNull();

    await act(async () => {
      fireEvent.click(addressDropDown);
      fireEvent.change(addressDropDown, {
        target: {
          value: '{"address":"test line1 2","postcode":"A1 1AA","uprn":"1234"}',
        },
      });
    });

    expect(screen.getByLabelText('Address')).toHaveValue('test line1 2');
    expect(screen.getAllByLabelText('Postcode')[1]).toHaveValue('A1 1AA');
    expect(
      screen.getByLabelText('Unique property reference number')
    ).toHaveValue('1234');
  });

  it('submits a selected address correctly', async () => {
    const mocked_results = addressesAPIWrapperFactory.build();
    mockedAxios.get.mockResolvedValue({
      data: mocked_results,
    });

    render(
      <CustomAddressEditor
        name="address"
        label="Address"
        onClose={mockClose}
        resident={mockedResident}
      />
    );
    userEvent.type(screen.getByLabelText('Building number or name'), '1');
    userEvent.type(screen.getAllByLabelText('Postcode')[0], 'Town St');
    await waitFor(() => fireEvent.click(screen.getByText('Find address')));
    expect(mockedAxios.get).toBeCalledWith(
      '/api/postcode/Town St?page=1&buildingNumber=1'
    );

    const addressDropDown = screen.getByRole('combobox');

    await act(async () => {
      fireEvent.click(addressDropDown);
      fireEvent.change(addressDropDown, {
        target: {
          value: '{"address":"test line1 2","postcode":"A1 1AA","uprn":"1234"}',
        },
      });
    });
    await waitFor(() => fireEvent.click(screen.getByText('Save')));

    expect(global.fetch).toBeCalledWith('/api/residents/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: {
          address: 'test line1 2',
          postcode: 'A1 1AA',
          uprn: 1234,
        },
      }),
    });
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

  it('shows all addresses after a search even if the results are paginated', async () => {
    const mocked_results_page_1 = {
      ...addressesAPIWrapperFactory.build(),
      page_count: 2,
    };
    const mocked_results_page_2 = addressesAPI3and4WrapperFactory.build();
    mockedAxios.get
      .mockResolvedValueOnce(mocked_results_page_1)
      .mockResolvedValueOnce(mocked_results_page_2);

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

    expect(mockedAxios.get).toBeCalledWith(
      '/api/postcode/Town St?page=1&buildingNumber=1'
    );

    expect(mockedAxios.get).toBeCalledWith(
      '/api/postcode/Town St?page=2&buildingNumber=1'
    );

    expect(mockedAxios.get).not.toBeCalledWith(
      '/api/postcode/Town St?page=3&buildingNumber=1'
    );

    const addressDropDown = screen.getByRole('combobox');
    expect(addressDropDown).not.toBeNull();

    await act(async () => {
      fireEvent.click(addressDropDown);
    });

    expect(addressDropDown.childElementCount).toBe(4);
  });
});
