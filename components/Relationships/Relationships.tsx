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

  let shouldAppear = false;
  Object.values(personalRelationships).map((val) => {
    shouldAppear = shouldAppear || val.length > 0;
  });

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
            {Object.entries(personalRelationships)
              .sort((a, b) => b[1] - a[1])
              .map(([key, value]) => {
                if (value.length > 0) {
                  return (
                    <RelationshipElement
                      title={key}
                      data={value}
                      key={`rel_${key}`}
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
