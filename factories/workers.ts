import { Factory } from 'fishery';

import { Worker } from 'types';

export const userFactory = Factory.define<Worker>(({ sequence }) => ({
  id: sequence,
  email: 'foo.bar@hackney.gov.uk',
  firstName: 'Foo',
  lastName: 'Bar',
  role: 'aliquam',
  allocationCount: 0,
  teams: [],
}));

export const mockedWorker = userFactory.build();
export const mockedWorkers = [userFactory.build()];
