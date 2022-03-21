import { act, fireEvent, render } from '@testing-library/react';
import AddWorkerAllocation from './AddWorkerAllocation';
import * as allocatedWorkerAPI from 'utils/api/allocatedWorkers';
import { format } from 'date-fns';

jest.mock('next/router', () => ({
  useRouter: () => ({
    id: 12,
    allocationId: 123,
    asPath: 'path',
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));
jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`AddWorkerAllocation`, () => {
  jest.spyOn(allocatedWorkerAPI, 'useTeamWorkers').mockImplementation(() => ({
    data: [
      {
        id: 9,
        firstName: 'Worker',
        lastName: 'A',
        allocationCount: 3,
        role: 'role_a',
        email: 'a@email.com',
        teams: [],
      },
    ],
    revalidate: jest.fn(),
    mutate: jest.fn(),
    isValidating: false,
  }));

  const props = {
    personId: 123,
    allocationId: 12,
  };

  it('should load the page correctly', async () => {
    const { getByTestId } = render(<AddWorkerAllocation {...props} />);
    expect(getByTestId('allocationStartDate')).toBeInTheDocument();
    expect(getByTestId('submitbutton')).toBeInTheDocument();
  });

  it('Should show the list of workers connected to the team', async () => {
    const { getByTestId } = render(<AddWorkerAllocation {...props} />);

    expect(getByTestId('workerName')).toHaveTextContent('Worker A');
  });

  it('should render and submit correctly', async () => {
    jest.spyOn(allocatedWorkerAPI, 'addWorkerToAllocation');

    const { getByRole, getByTestId } = render(
      <AddWorkerAllocation {...props} />
    );

    await act(async () => {
      fireEvent.click(getByTestId('select_Worker_A'));
    });
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(allocatedWorkerAPI.addWorkerToAllocation).toHaveBeenCalled();
    expect(allocatedWorkerAPI.addWorkerToAllocation).toHaveBeenCalledWith(
      123,
      12,
      {
        allocatedWorkerId: 9,
        allocationStartDate: format(new Date(), 'yyyy-MM-dd'),
      }
    );
  });
});
