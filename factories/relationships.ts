import { Factory } from 'fishery';
import { RelationshipData, Relationship, RelationshipPerson } from 'types';

const mockedRelationshipFactory = Factory.define<RelationshipData>(
  ({ sequence }) => ({
    personId: sequence,
    personalRelationships: [],
  })
);

const mockedRelation = Factory.define<Relationship>(({ sequence }) => ({
  id: sequence,
  firstName: 'mock_me',
  lastName: 'mock_me',
  parents: [],
  siblings: [],
  children: [],
  other: [],
}));

const mockedRelationPerson = Factory.define<RelationshipPerson>(
  ({ sequence }) => ({
    id: sequence,
    firstName: 'mock_me',
    lastName: 'mock_me',
  })
);

export const mockedRelationship = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: [
    mockedRelation.build({
      id: 4123,
      firstName: 'asafar',
      lastName: 'katarata',
      parents: [
        mockedRelationPerson.build({
          id: 111,
          firstName: 'Giovanni',
          lastName: 'Muciaccia',
        }),
      ],
      siblings: [
        mockedRelationPerson.build({
          id: 222,
          firstName: 'Andrea',
          lastName: 'Loprinzo',
        }),
      ],
      children: [
        mockedRelationPerson.build({
          id: 333,
          firstName: 'Giuseppe',
          lastName: 'Geppetto',
        }),
      ],
      other: [
        mockedRelationPerson.build({
          id: 444,
          firstName: 'Pinocchio',
          lastName: 'Geppetto',
        }),
      ],
    }),
  ],
});

export const mockedRelationshipNoData = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: [
    mockedRelation.build({
      id: 4123,
      firstName: 'Asafara',
      lastName: 'Katarata',
      parents: [],
      siblings: [],
      children: [],
      other: [],
    }),
  ],
});

export const mockRelationshipEmptyData = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: [],
});

export const mockedRelationshipPartialData = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: [
    mockedRelation.build({
      id: 4123,
      firstName: 'asafar',
      lastName: 'katarata',
      parents: [
        mockedRelationPerson.build({
          id: 111,
          firstName: 'Mastro',
          lastName: 'Geppetto',
        }),
      ],
      siblings: [],
      children: [
        mockedRelationPerson.build({
          id: 123,
          firstName: 'Pinocchio',
          lastName: 'Geppetto',
        }),
      ],
      other: [],
    }),
  ],
});
