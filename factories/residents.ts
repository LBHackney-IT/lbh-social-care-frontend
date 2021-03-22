import { Factory } from 'fishery';

import { Resident, AgeContext } from 'types';

const residentFactory = Factory.define<Resident>(({ sequence }) => ({
  mosaicId: sequence,
  dateOfBirth: '2020-11-13',
  firstName: 'Foo',
  lastName: 'Bar',
  nhsNumber: '12345',
  ageContext: 'A' as AgeContext,
  gender: 'F',
}));

export const mockedResident = residentFactory.build();
