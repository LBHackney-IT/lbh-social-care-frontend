import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useRelationships } from 'utils/api/relationships';
import RelationshipElement from './RelationshipElement';
import Button from 'components/Button/Button';

interface Props {
  id: number;
}

const Relationships = ({ id }: Props): React.ReactElement => {
  const { data: { personalRelationships } = {}, error } = useRelationships(id);
  if (!personalRelationships) {
    return <Spinner />;
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
            label="Add a new relationship"
            route={`${id}/relationships/`}
          />
        </div>

        <hr className="govuk-divider" />
        {personalRelationships && personalRelationships.length > 0 ? (
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
        ) : (
          <p>
            <i>No relationship found</i>
          </p>
        )}
      </div>
      {error && <ErrorMessage />}
    </div>
  );
};

export default Relationships;
