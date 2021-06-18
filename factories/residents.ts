import { Factory } from 'fishery';

import { LegacyResident, Resident } from 'types';

export const legacyResidentFactory = Factory.define<LegacyResident>(
  ({ sequence }) => ({
    mosaicId: sequence,
    dateOfBirth: '2020-11-13',
    firstName: 'Foo',
    lastName: 'Bar',
    nhsNumber: '12345',
    ageContext: 'A',
    gender: 'F',
  })
);

export const residentFactory = Factory.define<Resident>(({ sequence }) => ({
  id: sequence,
  dateOfBirth: '2020-11-13',
  firstName: 'Foo',
  lastName: 'Bar',
  nhsNumber: 12345,
  contextFlag: 'A',
  gender: 'F',
  createdBy: 'foo@bar.com',
  otherNames: [],
  phoneNumbers: [],
  addresses: [],
}));

export const mockedLegacyResident = legacyResidentFactory.build();
export const mockedResident = residentFactory.build();
