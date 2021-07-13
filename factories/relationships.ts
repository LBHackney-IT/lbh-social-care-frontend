import { Factory } from 'fishery';
import { RelationshipData, RelationshipPerson, Relationship } from 'types';

export const mockedRelationshipFactory = Factory.define<RelationshipData>(
  ({ sequence }) => ({
    personId: sequence,
    personalRelationships: [],
  })
);

export const mockedRelationshipData = Factory.define<Relationship>(() => ({
  type: 'parent',
  persons: [],
}));

export const mockedRelationPerson = Factory.define<RelationshipPerson>(
  ({ sequence }) => ({
    id: sequence,
    firstName: 'mock_me',
    lastName: 'mock_me',
    gender: 'M',
    isMainCarer: 'N',
    details: 'Some context of relationship',
  })
);

export const mockedUnbornSiblingRelationship = mockedRelationshipData.build({
  type: 'unbornSibling',
  persons: [
    mockedRelationPerson.build({
      id: 111,
      firstName: 'Jambi',
      lastName: 'Neverborn',
    }),
  ],
});

export const mockedParentRelationship = mockedRelationshipData.build({
  type: 'parent',
  persons: [
    mockedRelationPerson.build({
      id: 111,
      firstName: 'Giovanni',
      lastName: 'Muciaccia',
    }),
    mockedRelationPerson.build({
      id: 123,
      firstName: 'Neil',
      lastName: 'GrandeArtista',
    }),
  ],
});

export const mockedOrderedRelationship = mockedRelationshipData.build({
  type: 'parent',
  persons: [
    mockedRelationPerson.build({
      id: 111,
      firstName: 'Neil',
      lastName: 'Muciaccia',
    }),
    mockedRelationPerson.build({
      id: 123,
      firstName: 'Giovanni',
      lastName: 'Muciaccia',
    }),
    mockedRelationPerson.build({
      id: 123,
      firstName: 'Francesco',
      lastName: 'Rostrini',
    }),
    mockedRelationPerson.build({
      id: 123,
      firstName: 'Michele',
      lastName: 'Giuppone',
    }),
  ],
});

export const mockedAddRelationship = {
  personId: 123,
  otherPersonId: 456,
  type: 'sibling',
  isMainCarer: 'Y',
  isInformalCarer: 'N',
  details: 'Emergency contact',
};

export const mockedRelationship = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: [
    mockedRelationshipData.build({
      type: 'parent',
      persons: [
        mockedRelationPerson.build({
          id: 111,
          firstName: 'Giovanni',
          lastName: 'Muciaccia',
        }),
      ],
    }),
    mockedRelationshipData.build({
      type: 'sibling',
      persons: [
        mockedRelationPerson.build({
          id: 222,
          firstName: 'Andrea',
          lastName: 'Loprinzo',
        }),
      ],
    }),
    mockedRelationshipData.build({
      type: 'child',
      persons: [
        mockedRelationPerson.build({
          id: 333,
          firstName: 'Giuseppe',
          lastName: 'Geppetto',
        }),
      ],
    }),
    mockedRelationshipData.build({
      type: 'other',
      persons: [
        mockedRelationPerson.build({
          id: 444,
          firstName: 'Pinocchio',
          lastName: 'Geppetto',
        }),
      ],
    }),
    mockedRelationshipData.build({
      type: 'unbornSibling',
      persons: [
        mockedRelationPerson.build({
          id: 444,
          firstName: 'Jambi',
          lastName: 'Neverborn',
        }),
      ],
    }),
    mockedRelationshipData.build({
      type: 'siblingOfUnbornChild',
      persons: [
        mockedRelationPerson.build({
          id: 444,
          firstName: 'Cento',
          lastName: 'Neverborn',
        }),
      ],
    }),
  ],
});

export const mockedRelationshipNoData = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: [],
});

export const mockRelationshipEmptyData = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: [],
});

export const mockedRelationshipPartialData = mockedRelationshipFactory.build({
  personId: 123,
  personalRelationships: [
    mockedRelationshipData.build({
      type: 'parent',
      persons: [
        mockedRelationPerson.build({
          id: 111,
          firstName: 'Mastro',
          lastName: 'Geppetto',
        }),
      ],
    }),
    mockedRelationshipData.build({
      type: 'child',
      persons: [
        mockedRelationPerson.build({
          id: 333,
          firstName: 'Pinocchio',
          lastName: 'Geppetto',
        }),
      ],
    }),
  ],
});
