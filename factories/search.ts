import { Factory } from 'fishery';
import { ResidentsAPI, LegacyResident } from 'types';

export const legacyResidentFactory = Factory.define<LegacyResident>(
  ({ sequence }) => ({
    mosaicId: String(sequence),
    dateOfBirth: '2020-11-13',
    firstName: 'Foo',
    lastName: 'Bar',
    nhsNumber: '12345',
    ageContext: 'A',
    gender: 'F',
  })
);

export const mockResidentAPIFactory = Factory.define<ResidentsAPI>(() => ({
  residents: [legacyResidentFactory.build()],
  nextCursor: '20',
  totalCount: '300',
}));

export const mockResponseApi = mockResidentAPIFactory.build();
