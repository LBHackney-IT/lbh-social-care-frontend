import { act, fireEvent, render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';
import AddAllocatedWorker from './AddAllocatedWorker';

import * as allocatedWorkerAPI from 'utils/api/allocatedWorkers';

import { AgeContext } from 'types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { teamId: '3' },
    asPath: 'path',
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`AddAllocatedWorker`, () => {
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

  it('should render properly', async () => {
    const { getByTestId, asFragment } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <AddAllocatedWorker {...props} />
      </UserContext.Provider>
    );
    const teamAutocomplete = getByTestId('teamId');

    expect(teamAutocomplete).toBeInTheDocument();
    expect(allocatedWorkerAPI.useTeams).toHaveBeenCalledWith({
      ageContext: 'A',
    });
    await act(async () => {
      fireEvent.click(teamAutocomplete);
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render and submit correctly', async () => {
    jest.spyOn(allocatedWorkerAPI, 'addAllocatedWorker');
    const { getByLabelText, getByRole, getByTestId } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <AddAllocatedWorker {...props} />
      </UserContext.Provider>
    );
    const teamAutocomplete = getByTestId('teamId');

    await act(async () => {
      fireEvent.click(teamAutocomplete);
    });

    await act(async () => {
      fireEvent.click(getByTestId('teamId_0'));
    });

    fireEvent.click(getByLabelText('Worker C'));

    fireEvent.change(getByLabelText('Day'), { target: { value: '01' } });
    fireEvent.change(getByLabelText('Month'), { target: { value: '01' } });
    fireEvent.change(getByLabelText('Year'), { target: { value: '2021' } });

    await act(async () => {
      fireEvent.submit(getByRole('form'));
    });

    expect(allocatedWorkerAPI.addAllocatedWorker).toHaveBeenCalled();
    expect(allocatedWorkerAPI.addAllocatedWorker).toHaveBeenCalledWith(123, {
      allocatedTeamId: 3,
      allocatedWorkerId: 7,
      allocationStartDate: '2021-01-01',
      ragRating: 'none',
    });
  });
});
