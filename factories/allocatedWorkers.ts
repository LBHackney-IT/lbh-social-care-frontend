import { Factory } from 'fishery';

import { Allocation } from 'types';

export const allocationFactory = Factory.define<Allocation>(({ sequence }) => ({
  id: sequence,
  allocatedWorkerTeam: 'Safeguarding and Reviewing Team',
  allocatedWorker: 'Officer Name',
  allocationEndDate: '2019-03-28 00:00:00',
  allocationStartDate: '2019-03-28 00:00:00',
  workerType: 'Consultant Social Worker',
  personId: 1234,
  caseStatus: 'Open',
  personName: 'foo',
  personAddress: 'the address',
  personDateOfBirth: '2020-03-20',
  ragRating: 'amber',
}));

export const mockedAllocation = allocationFactory.build();
export const mockedAllocations = [allocationFactory.build()];
