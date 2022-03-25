import { render, act, fireEvent } from '@testing-library/react';
import EditAllocationPriority from './EditAllocationPriority';
import { mockedResident } from 'factories/residents';
import * as allocatedWorkerAPI from 'utils/api/allocatedWorkers';

jest.mock('next/router', () => ({
  useRouter: () => ({
    id: 123,
    allocationId: 12,
    asPath: 'path',
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));
jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`DeallocateTeamWorker`, () => {
  const props = {
    resident: mockedResident,
    allocationId: 12,
  };

  it('should load the page correctly', async () => {
    const { getByText } = render(<EditAllocationPriority {...props} />);

    expect(getByText('Choose a priority rating')).toBeInTheDocument();
    expect(getByText('Urgent priority')).toBeInTheDocument();
    expect(getByText('High priority')).toBeInTheDocument();
    expect(getByText('Medium priority')).toBeInTheDocument();
    expect(getByText('Low priority')).toBeInTheDocument();

    expect(getByText('Continue')).toBeInTheDocument();
  });

  it('should render a disabled button when no priority level is selected', async () => {
    const { getByText } = render(<EditAllocationPriority {...props} />);

    expect(getByText(/Continue/).closest('button')).toBeDisabled();
  });

  it('should enable the submit button when a priority level is selected', async () => {
    const { getByText } = render(<EditAllocationPriority {...props} />);
    act(() => {
      fireEvent.click(getByText('High priority'));
    });
    expect(getByText(/Continue/).closest('button')).toBeEnabled();
  });

  it('should render and submit correctly the form', async () => {
    jest.spyOn(allocatedWorkerAPI, 'patchAllocation');

    const { getByRole, getByText } = render(
      <EditAllocationPriority {...props} />
    );
    act(() => {
      fireEvent.click(getByText('High priority'));
    });
    expect(getByText(/Continue/).closest('button')).toBeEnabled();

    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });

    expect(allocatedWorkerAPI.patchAllocation).toHaveBeenCalled();
    expect(allocatedWorkerAPI.patchAllocation).toHaveBeenCalledWith(1, {
      id: 12,
      ragRating: 'high',
    });
  });
});
