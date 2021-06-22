import Link from 'next/link';
import { RelationshipPerson } from 'types';

interface Props {
  title: string;
  data: RelationshipPerson[];
}

const RelationshipElement = ({ title, data }: Props): React.ReactElement => {
  return (
    <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{renderTitle(title)}</dt>
      <dd className="govuk-summary-list__value">
        <ul className="govuk-list">
          {data.map((person, i) => {
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

function renderTitle(title: string) {
  switch (title) {
    case 'parents':
      return 'Parents';
    case 'parent':
      return 'Parent';
    case 'children':
      return 'Children';
    case 'child':
      return 'Child';
    case 'other':
      return 'Other';
    case 'greatGrandchild':
      return 'Great grandchild';
    case 'greatGrandparent':
      return 'Great grandparent';
    case 'grandchild':
      return 'Grandchild';
    case 'grandparent':
      return 'Grandparent';
    case 'stepParent':
      return 'Step parent';
    case 'auntUncle':
      return 'Aunt / Uncle';
    case 'stepChild':
      return 'Step child';
    case 'unbornChild':
      return 'Unborn child';
    case 'partner':
      return 'Partner';
    case 'exPartner':
      return 'Ex-partner';
    case 'sibling':
      return 'Sibling';
    case 'siblings':
      return 'Siblings';
    case 'halfSibling':
      return 'Half sibling';
    case 'stepSibling':
      return 'Step sibling';
    case 'unbornSibling':
      return 'Unborn sibling';
    case 'spouse':
      return 'Spouse';
    case 'cousin':
      return 'Cousin';
    case 'nieceNephew':
      return 'Niece / Nephew';
    case 'fosterCarer':
      return 'Foster carer';
    case 'friend':
      return 'friend';
    case 'exSpouse':
      return 'Ex spouse';
    case 'parentOfUnbornChild':
      return 'Parent of unborn child';
    case 'siblingOfUnbornChild':
      return 'Sibling of unborn child';
    case 'fosterCarerSupportCarer':
      return 'Foster carer';
    case 'privateFosterCarer':
      return 'Private foster carer';
    case 'privateFosterChild':
      return 'Private foster child';
    case 'fosterChild':
      return 'Foster child';
    case 'supportCarerFosterCarer':
      return 'Support carer';
    case 'neighbour':
      return 'Neighbour';
    case 'inContactWith':
      return 'In contact with';
    case 'acquaintance':
      return 'Acquaintance';
    default:
      return title;
  }
}

export default RelationshipElement;
