import { Factory } from 'fishery';
import { RelationshipData, RelationshipPerson } from 'types';

const mockedRelationshipFactory = Factory.define<RelationshipData>(
  ({ sequence }) => ({
    personId: sequence,
    personalRelationships: {
      sibling: [],
      other: [],
      parent: [],
      child: [],
      greatGrandchild: [],
      greatGrandparent: [],
      grandchild: [],
      grandparent: [],
      stepParent: [],
      auntUncle: [],
      stepChild: [],
      unbornChild: [],
      partner: [],
      exPartner: [],
      halfSibling: [],
      stepSibling: [],
      unbornSibling: [],
      spouse: [],
      cousin: [],
      nieceNephew: [],
      fosterCarer: [],
      friend: [],
      exSpouse: [],
      parentOfUnbornChild: [],
      siblingOfUnbornChild: [],
      fosterCarerSupportCarer: [],
      privateFosterCarer: [],
      privateFosterChild: [],
      fosterChild: [],
      supportCarerFosterCarer: [],
      neighbour: [],
      inContactWith: [],
      acquaintance: [],
    },
  })
);

const mockedRelationPerson = Factory.define<RelationshipPerson>(
  ({ sequence }) => ({
    id: sequence,
    firstName: 'mock_me',
    lastName: 'mock_me',
  })
);

export const mockedRelationship = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: {
    parent: [
      mockedRelationPerson.build({
        id: 111,
        firstName: 'Giovanni',
        lastName: 'Muciaccia',
      }),
    ],

    sibling: [
      mockedRelationPerson.build({
        id: 222,
        firstName: 'Andrea',
        lastName: 'Loprinzo',
      }),
    ],

    child: [
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
    unbornSibling: [
      mockedRelationPerson.build({
        id: 444,
        firstName: 'Jambi',
        lastName: 'Neverborn',
      }),
    ],
    siblingOfUnbornChild: [
      mockedRelationPerson.build({
        id: 444,
        firstName: 'Cento',
        lastName: 'Neverborn',
      }),
    ],
  },
});

export const mockedRelationshipNoData = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: {
    parent: [],
    sibling: [],
    child: [],
    other: [],
  },
});

export const mockRelationshipEmptyData = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: {},
});

export const mockedRelationshipPartialData = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: {
    parent: [
      mockedRelationPerson.build({
        id: 111,
        firstName: 'Mastro',
        lastName: 'Geppetto',
      }),
    ],
    sibling: [],
    child: [
      mockedRelationPerson.build({
        id: 123,
        firstName: 'Pinocchio',
        lastName: 'Geppetto',
      }),
    ],
    other: [],
  },
});
