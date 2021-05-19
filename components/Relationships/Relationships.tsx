import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useRelationships } from 'utils/api/relationships';
import RelationshipElement from './RelationshipElement';

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

  let elm_count = 0;

  try {
    elm_count =
      personalRelationships[0].parents.length +
      personalRelationships[0].children.length +
      personalRelationships[0].siblings.length +
      personalRelationships[0].other.length;
  } catch (error) {
    elm_count = 0;
  }

  return (
    <div>
      <div>
        <div className="lbh-table-header">
          <h3 className="govuk-fieldset__legend--m govuk-custom-text-color">
            RELATIONSHIPS
          </h3>
        </div>
        <hr className="govuk-divider" />
        {personalRelationships && personalRelationships.length > 0 ? (
          personalRelationships.map((item, key) => {
            if (elm_count == 0) {
              return (
                <p key={key}>
                  <i>No relationship found</i>
                </p>
              );
            }

            return (
              <div key={key} className="govuk-summary-list">
                {<RelationshipElement title="Parents" data={item.parents} />}
                {<RelationshipElement title="Children" data={item.children} />}
                {<RelationshipElement title="Siblings" data={item.siblings} />}
                {<RelationshipElement title="Other" data={item.other} />}
              </div>
            );
          })
        ) : (
          <ErrorMessage />
        )}
      </div>
      {error && <ErrorMessage />}
    </div>
  );
};

export default Relationships;
