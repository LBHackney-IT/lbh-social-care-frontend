import Link from 'next/link';
import { RelationshipPerson } from 'types';

interface Props {
  title: string;
  data: RelationshipPerson[];
}

const RelationshipElement = ({ title, data }: Props): React.ReactElement => {
  return data.length > 0 ? (
    <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{title}</dt>
      <dd className="govuk-summary-list__value">
        <ul className="govuk-list">
          {data.map((person, i) => {
            return (
              <li className="lbh-link" key={'parent' + i}>
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
  ) : (
    <></>
  );
};

export default RelationshipElement;
