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

  const shouldAppear =
    (personalRelationships.parents &&
      personalRelationships.parents.length > 0) ||
    (personalRelationships.children &&
      personalRelationships.children.length > 0) ||
    (personalRelationships.siblings &&
      personalRelationships.siblings.length > 0) ||
    (personalRelationships.other && personalRelationships.other.length > 0);

  if (!shouldAppear) {
    return <></>;
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
        {
          <dl className="govuk-summary-list lbh-summary-list">
            {
              <RelationshipElement
                title="Parents"
                data={personalRelationships.parents}
              />
            }
            {
              <RelationshipElement
                title="Children"
                data={personalRelationships.children}
              />
            }
            {
              <RelationshipElement
                title="Siblings"
                data={personalRelationships.siblings}
              />
            }
            {
              <RelationshipElement
                title="Other"
                data={personalRelationships.other}
              />
            }
          </dl>
        }
      </div>
      {error && <ErrorMessage />}
    </div>
  );
};

export default Relationships;
