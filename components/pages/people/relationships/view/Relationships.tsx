import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useRelationships } from 'utils/api/relationships';
import Button from 'components/Button/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  FeatureFlagProvider,
  ConditionalFeature,
  FeatureSet,
} from 'lib/feature-flags/feature-flags';
import Link from 'next/link';

interface Props {
  id: number;
}

const Relationships = ({ id }: Props): React.ReactElement => {
  const { query } = useRouter();
  const [successMessage, setSuccessMessage] = useState(
    query && query.relationshipSuccess === 'true'
  );

  const { data: { personalRelationships } = {}, error } = useRelationships(id);

  setTimeout(() => {
    setSuccessMessage(false);
  }, 5000);

  const features: FeatureSet = {
    'add-relationships': {
      isActive: process.env.NODE_ENV === 'development',
    },
  };

  if (!personalRelationships) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div>
      <div>
        {successMessage ? (
          <section className="lbh-page-announcement">
            <h3 className="lbh-page-announcement__title">Relationship added</h3>
          </section>
        ) : (
          ''
        )}
        <div className="lbh-table-header">
          <h3 className="govuk-fieldset__legend--m govuk-custom-text-color">
            RELATIONSHIPS
          </h3>

          <FeatureFlagProvider features={features}>
            <ConditionalFeature name="add-relationships">
              <Button
                label="Add a new relationship"
                route={`${id}/relationships/add`}
              />
            </ConditionalFeature>
          </FeatureFlagProvider>
        </div>

        <hr className="govuk-divider" />
        {personalRelationships && personalRelationships.length > 0 ? (
          <dl className="govuk-summary-list lbh-summary-list">
            {personalRelationships
              .sort((a, b) => b.type.localeCompare(a.type))
              .map((relationship) => {
                if (relationship.persons.length > 0) {
                  return (
                    <div
                      className="govuk-summary-list__row"
                      key={relationship.type}
                    >
                      <dt className="govuk-summary-list__key">
                        {getTitleString(relationship.type)}
                      </dt>
                      <dd className="govuk-summary-list__value">
                        <ul className="govuk-list">
                          {relationship.persons
                            .sort(
                              (a, b) =>
                                a.lastName.localeCompare(b.lastName) ||
                                a.firstName.localeCompare(b.firstName)
                            )
                            .map((person, i) => {
                              return (
                                <li
                                  className="lbh-link"
                                  aria-label={`rel_${i}`}
                                  key={`rel_${i}`}
                                >
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

export default Relationships;
