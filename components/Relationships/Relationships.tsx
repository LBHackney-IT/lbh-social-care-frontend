import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useRelationships } from 'utils/api/relationships';
import RelationshipElement from './RelationshipElement';
import { useState, useEffect } from 'react';

interface Props {
  id: number;
}

const Relationships = ({ id }: Props): React.ReactElement => {
  const [shouldAppear, setShouldAppear] = useState(false);
  const { data: { personalRelationships } = {}, error } = useRelationships(id);

  useEffect(() => {
    const relationshipWithPeople = personalRelationships
      ? personalRelationships.filter((relationship) => {
          setShouldAppear(relationship.persons.length > 0);
        })
      : [];
    if (relationshipWithPeople.length > 0) {
      setShouldAppear(true);
    }
  }, [personalRelationships]);

  if (!personalRelationships) {
    return <Spinner />;
  }

  if (!shouldAppear) {
    return <></>;
  }
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div>
      <div>
        <div className="lbh-table-header">
          <h3 className="govuk-fieldset__legend--m govuk-custom-text-color">
            RELATIONSHIPS
          </h3>

          <Button
            label="Add a new relationships"
            route={`${id}/relationships/add`}
          />
        </div>

        <hr className="govuk-divider" />
        {
          <dl className="govuk-summary-list lbh-summary-list">
            {personalRelationships
              .sort((a, b) => b.type.localeCompare(a.type))
              .map((relationship) => {
                if (relationship.persons.length > 0) {
                  return (
                    <RelationshipElement
                      type={relationship.type}
                      persons={relationship.persons}
                      key={`rel_${relationship.type}`}
                    />
                  );
                }
              })}
          </dl>
        }
      </div>
      {error && <ErrorMessage />}
    </div>
  );
};

export default Relationships;
