import { Factory } from 'fishery';
import {
  Team,
  Worker,
  Allocation,
  WorkerAllocation,
  AllocationData,
} from 'types';

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
  personName: 'Foo Bar',
  personDateOfBirth: '',
  personAddress: '',
  ragRating: 'medium',
}));
export const workerAllocationFactory = Factory.define<WorkerAllocation>(() => ({
  workers: [],
  allocations: [],
}));
export const allocationDataFactory = Factory.define<AllocationData>(() => ({
  allocations: [allocationFactory.build()],
  totalCount: 0,
  nextCursor: 0,
  deletedRecordsCount: 0,
}));

export const mockedTeam = mockedTeamFactory.build();
export const mockedTeamWorker = mockedTeamWorkerFactory.build();
