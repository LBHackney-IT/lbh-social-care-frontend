import { act, fireEvent, render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import AddAllocatedWorker from './AddAllocatedWorker';

import {
  useTeams,
  useTeamWorkers,
  addAllocatedWorker,
} from 'utils/api/allocatedWorkers';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { teamId: '3' },
    asPath: 'path',
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

jest.mock('utils/api/allocatedWorkers', () => ({
  useTeams: jest.fn(),
  useTeamWorkers: jest.fn(),
  addAllocatedWorker: jest.fn(),
}));

describe(`AddAllocatedWorker`, () => {
  useTeams.mockImplementation(() => ({
    data: {
      teams: [
        { id: '1', name: 'Team 1' },
        { id: '2', name: 'Team 2' },
        { id: '3', name: 'Team 3' },
      ],
    },
  }));
  useTeamWorkers.mockImplementation(() => ({
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
    ageContext: 'A',
    control: { defaultValuesRef: { current: { name: 'teamId' } } },
  };

  it('should render properly', async () => {
    const { getByTestId, asFragment } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo', email: 'foo@bar.com' },
        }}
      >
        <AddAllocatedWorker {...props} />
      </UserContext.Provider>
    );
    const teamAutocomplete = await getByTestId('teamId');

    expect(teamAutocomplete).toBeInTheDocument();
    expect(useTeams).toHaveBeenCalledWith({ ageContext: 'A' });
    await act(async () => {
      fireEvent.click(teamAutocomplete);
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should post correctly properly to the API', async () => {
    const { getByLabelText, getByRole, getByTestId, asFragment } = render(
      <UserContext.Provider
        value={{
          user: { name: 'foo', email: 'foo@bar.com' },
        }}
      >
        <AddAllocatedWorker {...props} />
      </UserContext.Provider>
    );
    const teamAutocomplete = await getByTestId('teamId');

    await act(async () => {
      fireEvent.click(teamAutocomplete);
    });

    expect(asFragment()).toMatchSnapshot();

    await act(async () => {
      fireEvent.click(getByTestId('teamId_Team 3'));
    });

    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(getByLabelText('Worker C'));

    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });

    expect(addAllocatedWorker).toHaveBeenCalled();
    expect(addAllocatedWorker).toHaveBeenCalledWith('123', {
      allocatedBy: 'foo@bar.com',
      allocatedTeamId: '3',
      allocatedWorkerId: 'c',
    });
  });
});
