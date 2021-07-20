import { ObjectOption } from 'components/Form/types';

export const RELATIONSHIP_TYPES = {
  parent: 'Parent(s)',
  child: 'Children',
  other: 'Other',
  greatGrandchild: 'Great-grandchildren',
  greatGrandparent: 'Great-grandparent',
  grandchild: 'Grandchildren',
  grandparent: 'Grandparent(s)',
  stepParent: 'Step-parent(s)',
  auntUncle: 'Aunt / uncle',
  stepChild: 'Step-children',
  unbornChild: 'Unborn children',
  partner: 'Partner',
  exPartner: 'Ex-partner(s)',
  sibling: 'Sibling(s)',
  halfSibling: 'Half-sibling(s)',
  stepSibling: 'Step-sibling(s)',
  unbornSibling: 'Unborn sibling(s)',
  spouse: 'Spouse',
  cousin: 'Cousin(s)',
  nieceNephew: 'Niece / nephew',
  fosterCarer: 'Foster carer(s)',
  friend: 'Friend(s)',
  exSpouse: 'Ex-spouse',
  parentOfUnbornChild: 'Parent of unborn child',
  siblingOfUnbornChild: 'Sibling of unborn child',
  fosterCarerSupportCarer: 'Foster / support carer(s)',
  privateFosterCarer: 'Private foster carer(s)',
  privateFosterChild: 'Private foster children',
  fosterChild: 'Foster children',
  supportCarerFosterCarer: 'Support carer(s)',
  neighbour: 'Neighbour(s)',
  inContactWith: 'In contact with',
  acquaintance: 'Acquaintance(s)',
};

const convertRelationshipTypeToSingular = (text: string) => {
  if (text.toLowerCase().includes('children')) {
    return text.replace('ren', '');
  } else {
    return text.replace('(s)', '');
  }
};

export const RELATIONSHIP_TYPE_OPTIONS: ObjectOption[] = Object.entries(
  RELATIONSHIP_TYPES
)
  .map(([key, value]) => {
    if (key !== 'parentOfUnbornChild' && key !== 'siblingOfUnbornChild') {
      return {
        value: key,
        text: convertRelationshipTypeToSingular(value),
      };
    }
  })
  .filter((option) => option) as ObjectOption[];
