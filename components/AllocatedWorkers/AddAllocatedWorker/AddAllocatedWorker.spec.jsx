import { act, fireEvent, render } from '@testing-library/react';

import UserContext from 'components/UserContext/UserContext';
import AddAllocatedWorker from './AddAllocatedWorker';

import {
  getTeams,
  getTeamWorkers,
  addAllocatedWorker,
} from 'utils/api/allocatedWorkers';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock('utils/api/allocatedWorkers', () => ({
  getTeams: jest.fn(),
  getTeamWorkers: jest.fn(),
  addAllocatedWorker: jest.fn(),
}));

describe(`AddAllocatedWorker`, () => {
  getTeams.mockImplementation(() =>
    Promise.resolve({
      teams: [
        { id: '1', name: 'Team 1' },
        { id: '2', name: 'Team 2' },
        { id: '3', name: 'Team 3' },
      ],
    })
  );
  getTeamWorkers.mockImplementation(() =>
    Promise.resolve({
      workers: [
        { id: 'a', firstName: 'Worker', lastName: 'A' },
        { id: 'b', firstName: 'Worker', lastName: 'B' },
        { id: 'c', firstName: 'Worker', lastName: 'C' },
      ],
    })
  );
  const props = {
    currentlyAllocated: 3,
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
    const showModalButton = getByText('Allocate worker');
    fireEvent.click(showModalButton);
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
    const { getByText, getByLabelText, getByRole } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo', email: 'foo@bar.com' },
        }}
      >
        <AddAllocatedWorker {...props} type="people" />
      </UserContext.Provider>
    );
    await act(async () => {
      fireEvent.click(getByText('Allocate worker'));
    });
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
