import { Factory } from 'fishery';
import { Team, Worker, Allocation, WorkerAllocation } from 'types';

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

export const allocationFactory = Factory.define<Allocation>(({ sequence }) => ({
  id: sequence,
  caseStatus: 'Open',
  allocatedWorkerTeam: '',
  allocatedWorker: '',
  allocationStartDate: '',
  allocationEndDate: '',
  workerType: '',
  personId: 1,
  personName: '',
  personDateOfBirth: '',
  personAddress: '',
  ragRating: 'medium',
}));
export const workerAllocationFactory = Factory.define<WorkerAllocation>(
  ({ sequence }) => ({
    workers: [],
    allocations: [],
  })
);

export const mockedTeam = mockedTeamFactory.build();
export const mockedTeamWorker = mockedTeamWorkerFactory.build();
