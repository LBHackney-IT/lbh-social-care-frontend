import Link from 'next/link';
import { RelationshipPerson, RelationshipType } from 'types';

interface Props {
  type: RelationshipType;
  persons: RelationshipPerson[];
}

const RelationshipElement = ({ type, persons }: Props): React.ReactElement => {
  return (
    <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{getTitleString(type)}</dt>
      <dd className="govuk-summary-list__value">
        <ul className="govuk-list">
          {persons
            .sort(
              (a, b) =>
                a.lastName.localeCompare(b.lastName) ||
                a.firstName.localeCompare(b.firstName)
            )
            .map((person, i) => {
              return (
                <li className="lbh-link" key={`rel_${i}`}>
                  {person.id ? (
                    <Link href={`/people/${person.id}`}>
                      {`${person.firstName} ${person.lastName}`}
                    </Link>
                  ) : (
                    `${person.firstName} ${person.lastName}`
                  )}
                </li>
              );
            })}
        </ul>
      </dd>
    </div>
  );
};

const getTitleString = (relationshipType: keyof typeof mappings): string => {
  return mappings[relationshipType];
};

const mappings = {
  parent: 'Parent',
  child: 'Child',
  other: 'Other',
  greatGrandchild: 'Great grandchild',
  greatGrandparent: 'Great grandparent',
  grandchild: 'Grandchild',
  grandparent: 'Grandparent',
  stepParent: 'Step parent',
  auntUncle: 'Aunt / Uncle',
  stepChild: 'Step child',
  unbornChild: 'Unborn child',
  partner: 'Partner',
  exPartner: 'Ex-partner',
  sibling: 'Sibling',
  siblings: 'Siblings',
  halfSibling: 'Half sibling',
  stepSibling: 'Step sibling',
  unbornSibling: 'Unborn sibling',
  spouse: 'Spouse',
  cousin: 'Cousin',
  nieceNephew: 'Niece / Nephew',
  fosterCarer: 'Foster carer',
  friend: 'Friend',
  exSpouse: 'Ex spouse',
  parentOfUnbornChild: 'Parent of unborn child',
  siblingOfUnbornChild: 'Sibling of unborn child',
  fosterCarerSupportCarer: 'Foster carer',
  privateFosterCarer: 'Private foster carer',
  privateFosterChild: 'Private foster child',
  fosterChild: 'Foster child',
  supportCarerFosterCarer: 'Support carer',
  neighbour: 'Neighbour',
  inContactWith: 'In contact with',
  acquaintance: 'Acquaintance',
} as const;

export default RelationshipElement;
