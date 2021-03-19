import { Resident, AgeContext } from 'types';

export const mockedResident: Resident = {
  dateOfBirth: '2020-11-13',
  firstName: 'Foo',
  lastName: 'Bar',
  mosaicId: 123,
  nhsNumber: '12345',
  ageContext: 'A' as AgeContext,
  gender: 'F',
};
