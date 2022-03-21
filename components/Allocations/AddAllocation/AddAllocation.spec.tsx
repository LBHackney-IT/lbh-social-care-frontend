import { act, fireEvent, render } from '@testing-library/react';
import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';
import AddAllocation from './AddAllocation';
import * as allocatedWorkerAPI from 'utils/api/allocatedWorkers';
import { AgeContext } from 'types';
import { format } from 'date-fns';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { teamId: '3' },
    asPath: 'path',
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));
jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`AddAllocation`, () => {
  jest.spyOn(allocatedWorkerAPI, 'useTeams').mockImplementation(() => ({
    data: {
      teams: [
        { id: 1, name: 'Team 1' },
        { id: 2, name: 'Team 2' },
        { id: 3, name: 'Team 3' },
      ],
    },
    revalidate: jest.fn(),
    mutate: jest.fn(),
    isValidating: false,
  }));
  jest.spyOn(allocatedWorkerAPI, 'useTeamWorkers').mockImplementation(() => ({
    workers: [
      {
        id: 9,
        firstName: 'Worker',
        lastName: 'A',
        allocationCount: 3,
        role: 'role_a',
        email: 'a@email.com',
        teams: [],
      },
      {
        id: 8,
        firstName: 'Worker',
        lastName: 'B',
        allocationCount: 0,
        role: 'role_b',
        email: 'b@email.com',
        teams: [],
      },
      {
        id: 7,
        firstName: 'Worker',
        lastName: 'C',
        allocationCount: 1,
        role: 'role_c',
        email: 'c@email.com',
        teams: [],
      },
    ],
    revalidate: jest.fn(),
    mutate: jest.fn(),
    isValidating: false,
  }));
  const props = {
    personId: 123,
    ageContext: 'A' as AgeContext,
    control: { defaultValuesRef: { current: { name: 'teamId' } } },
  };

  it('should not show "Allocate a worker" if there is no team selected', async () => {
    const { queryByText } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <AddAllocation {...props} />
      </UserContext.Provider>
    );
    const allocate_worker_link = queryByText('+ Allocate a worker');
    expect(allocate_worker_link).not.toBeInTheDocument();
  });
  xit('should show "Allocate a worker" if a team selected', async () => {
    jest.spyOn(allocatedWorkerAPI, 'useTeamWorkers').mockImplementation(() => ({
      workers: [
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

    const { getByTestId } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <AddAllocation {...props} />
      </UserContext.Provider>
    );
    const teamAutocomplete = getByTestId('teamId');

    await act(async () => {
      fireEvent.click(teamAutocomplete);
      fireEvent.change(teamAutocomplete, { target: { value: 'Team 3' } });
    });
    await act(async () => {
      fireEvent.click(getByTestId('teamId'));
      expect(teamAutocomplete).toHaveValue('Team 3');
    });

    const allocate_worker_link = getByTestId('allocate_worker_link');
    expect(allocate_worker_link).toBeInTheDocument();
  });

  it('should render and submit correctly', async () => {
    jest.spyOn(allocatedWorkerAPI, 'addAllocatedWorker');

    const { getByText, getByRole, getByTestId } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <AddAllocation {...props} />
      </UserContext.Provider>
    );
    const teamAutocomplete = getByTestId('teamId');
    await act(async () => {
      fireEvent.click(teamAutocomplete);
    });
    await act(async () => {
      fireEvent.click(getByText('Team 3'));
    });
    await act(async () => {
      fireEvent.click(getByText('Medium priority'));
    });
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });

    expect(allocatedWorkerAPI.addAllocatedWorker).toHaveBeenCalled();
    expect(allocatedWorkerAPI.addAllocatedWorker).toHaveBeenCalledWith(123, {
      allocatedTeamId: 3,
      allocationStartDate: format(new Date(), 'yyyy-MM-dd'),
      ragRating: 'amber',
    });
  });
});
