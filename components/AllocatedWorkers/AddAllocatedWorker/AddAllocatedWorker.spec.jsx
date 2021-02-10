import { act, fireEvent, render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import AddAllocatedWorker from './AddAllocatedWorker';

import {
  getTeams,
  getTeamWorkers,
  addAllocatedWorker,
} from 'utils/api/allocatedWorkers';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock('utils/api/allocatedWorkers', () => ({
  getTeams: jest.fn(),
  getTeamWorkers: jest.fn(),
  addAllocatedWorker: jest.fn(),
}));

describe(`AddAllocatedWorker`, () => {
  getTeams.mockImplementation(() => ({
    data: {
      teams: [
        { id: '1', name: 'Team 1' },
        { id: '2', name: 'Team 2' },
        { id: '3', name: 'Team 3' },
      ],
    },
  }));
  getTeamWorkers.mockImplementation(() => ({
    data: {
      workers: [
        { id: 'a', firstName: 'Worker', lastName: 'A', allocationCount: 3 },
        { id: 'b', firstName: 'Worker', lastName: 'B' },
        { id: 'c', firstName: 'Worker', lastName: 'C' },
      ],
    },
  }));
  const props = {
    personId: '123',
  };

  it('should render properly', async () => {
    const { findByText, getByText, asFragment } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo', email: 'foo@bar.com' },
        }}
      >
        <AddAllocatedWorker {...props} type="people" />
      </UserContext.Provider>
    );
    const teamRadio = await findByText(
      'Select a team to view workers for that team'
    );
    expect(teamRadio).toBeInTheDocument();
    const radioSelection = getByText('Team 1');
    await act(async () => {
      fireEvent.click(radioSelection);
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should post correctly properly to the API', async () => {
    const { findByText, getByLabelText, getByRole } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo', email: 'foo@bar.com' },
        }}
      >
        <AddAllocatedWorker {...props} type="people" />
      </UserContext.Provider>
    );
    await findByText('Select a team to view workers for that team');
    await act(async () => {
      fireEvent.click(getByLabelText('Team 3'));
    });
    fireEvent.click(getByLabelText('Worker C'));
    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });
    expect(addAllocatedWorker).toHaveBeenCalled();
    expect(addAllocatedWorker).toHaveBeenCalledWith('123', {
      allocatedBy: 'foo@bar.com',
      allocatedWorkerId: 'c',
    });
  });
});
