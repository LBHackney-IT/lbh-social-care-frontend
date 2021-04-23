import { Factory } from 'fishery';

import { Resident, ExtendedResident } from 'types';

export const legacyResidentFactory = Factory.define<Resident>(
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

export const residentFactory = Factory.define<ExtendedResident>(
  ({ sequence }) => ({
    personId: sequence,
    dateOfBirth: '2020-11-13',
    firstName: 'Foo',
    lastName: 'Bar',
    nhsNumber: 12345,
    contextFlag: 'A',
    gender: 'F',
    createdBy: 'foo@bar.com',
    otherNames: [],
    phoneNumbers: [],
  })
);

export const mockedLegacyResident = legacyResidentFactory.build();
export const mockedResident = residentFactory.build();
