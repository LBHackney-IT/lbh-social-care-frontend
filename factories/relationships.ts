import { Factory } from 'fishery';
import { RelationshipData, ExistingRelationship, Relationship } from 'types';

export const mockedRelationshipFactory = Factory.define<RelationshipData>(
  ({ sequence }) => ({
    personId: sequence,
    personalRelationships: [],
  })
);

export const mockedRelationshipData = Factory.define<Relationship>(() => ({
  type: 'parent',
  relationships: [],
}));

export const mockedExistingRelationship = Factory.define<ExistingRelationship>(
  ({ sequence }) => ({
    id: sequence,
    personId: sequence + 1,
    firstName: 'Foo',
    lastName: 'Bar',
    gender: 'M',
    isMainCarer: 'N',
    details: 'Some context of relationship',
  })
);

export const mockedAddRelationship = {
  personId: 123,
  otherPersonId: 456,
  type: 'sibling',
  isMainCarer: 'Y',
  isInformalCarer: 'N',
  details: 'Emergency contact',
};
