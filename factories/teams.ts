import { Factory } from 'fishery';
import { Team, Worker } from 'types';

export const mockedTeamFactory = Factory.define<Team>(({ sequence }) => ({
  id: sequence,
  name: 'example_team',
}));

export const mockedTeamWorkerFactory = Factory.define<Worker>(
  ({ sequence }) => ({
    id: sequence,
    firstName: 'Worker',
    lastName: 'A',
    allocationCount: 3,
    role: 'role_a',
    email: 'a@email.com',
    teams: [],
  })
);

export const mockedTeam = mockedTeamFactory.build();
export const mockedTeamWorker = mockedTeamWorkerFactory.build();
