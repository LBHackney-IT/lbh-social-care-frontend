import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useRelationships } from 'utils/api/relationships';
import Button from 'components/Button/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ConditionalFeature } from 'lib/feature-flags/feature-flags';
import Link from 'next/link';
import style from './Relationships.module.scss';
import { RelationshipType } from 'types';
import { RELATIONSHIP_TYPES } from 'data/relationships';

interface Props {
  id: number;
}

const Relationships = ({ id }: Props): React.ReactElement => {
  const { query } = useRouter();
  const [successMessage, setSuccessMessage] = useState(
    query && query.relationshipSuccess === 'true'
  );

  const {
    data: { personalRelationships: personalRelationshipsApiResponse } = {},
    error,
  } = useRelationships(id);

  setTimeout(() => {
    setSuccessMessage(false);
  }, 5000);

  if (!personalRelationshipsApiResponse) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage />;
  }

  const personalRelationships = personalRelationshipsApiResponse.filter(
    (relationship) =>
      relationship.type !== 'parentOfUnbornChild' &&
      relationship.type !== 'siblingOfUnbornChild'
  );

  const combineOfUnbornChildForType = (type: RelationshipType) => {
    const relationshipsOfUnbornChild = personalRelationshipsApiResponse.filter(
      (relationship) => relationship.type === `${type}OfUnbornChild`
    );

    if (
      relationshipsOfUnbornChild.length > 0 &&
      personalRelationships.some((relationship) => relationship.type === type)
    ) {
      const relationshipTypeIndex = personalRelationships.findIndex(
        (relationship) => relationship.type === type
      );

      personalRelationships[relationshipTypeIndex].persons =
        personalRelationships[relationshipTypeIndex].persons.concat(
          relationshipsOfUnbornChild[0].persons
        );
    } else if (relationshipsOfUnbornChild.length > 0) {
      personalRelationships.push({
        type: type,
        persons: relationshipsOfUnbornChild[0].persons,
      });
    }
  };

  combineOfUnbornChildForType('parent');
  combineOfUnbornChildForType('sibling');

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
          <ConditionalFeature name="add-relationships">
            <Button
              label="Add a new relationship"
              route={`/people/${id}/relationships/add`}
            />
          </ConditionalFeature>
        </div>

        <hr className="govuk-divider" />
        {personalRelationships && personalRelationships.length > 0 ? (
          <table className="govuk-table lbh-table">
            <thead className="govuk-table__head govuk-visually-hidden">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">
                  Relationship type
                </th>
                <th scope="col" className="govuk-table__header">
                  Name
                </th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              {personalRelationships
                .sort((a, b) => b.type.localeCompare(a.type))
                .map((relationship) => {
                  return relationship.persons
                    .sort(
                      (a, b) =>
                        a.lastName.localeCompare(b.lastName) ||
                        a.firstName.localeCompare(b.firstName)
                    )
                    .map((person, personRowIndex) => (
                      <tr
                        className="govuk-table__row"
                        key={`${relationship.type}-${personRowIndex}`}
                      >
                        {personRowIndex === 0 && (
                          <th
                            data-testid={`${relationship.type}`}
                            scope="row"
                            className="govuk-table__header govuk-!-width-one-quarter"
                            rowSpan={relationship.persons.length}
                          >
                            {RELATIONSHIP_TYPES[relationship.type]}
                          </th>
                        )}
                        <td
                          data-testid={`related-person-name-${personRowIndex}`}
                          key={`related-person-name-${personRowIndex}`}
                          className={`${
                            relationship.persons.length > 1 &&
                            personRowIndex !== relationship.persons.length - 1
                              ? `govuk-table__cell govuk-!-width-one-quarter ${style.noBorder}`
                              : 'govuk-table__cell govuk-!-width-one-quarter'
                          }`}
                        >
                          {person.id ? (
                            <Link href={`/people/${person.id}`}>
                              {`${person.firstName} ${person.lastName}`}
                            </Link>
                          ) : (
                            `${person.firstName} ${person.lastName}`
                          )}
                        </td>
                        <td
                          data-testid={`related-person-additional-options-${personRowIndex}`}
                          key={`related-person-additional-options-${personRowIndex}`}
                          className={`${
                            relationship.persons.length > 1 &&
                            personRowIndex !== relationship.persons.length - 1
                              ? `govuk-table__cell ${style.noBorder}`
                              : 'govuk-table__cell'
                          }`}
                        >
                          {person.isMainCarer === 'Y' && 'Main carer'}
                        </td>
                        <td
                          data-testid={`related-person-gender-${personRowIndex}`}
                          key={`related-person-gender-${personRowIndex}`}
                          className={`${
                            relationship.persons.length > 1 &&
                            personRowIndex !== relationship.persons.length - 1
                              ? `govuk-table__cell ${style.noBorder}`
                              : 'govuk-table__cell'
                          }`}
                        >
                          {getGenderString(
                            person.gender as keyof typeof genderMappings
                          )}
                        </td>
                        <td
                          data-testid={`related-person-details-${personRowIndex}`}
                          key={`related-person-details-${personRowIndex}`}
                          className={`${
                            relationship.persons.length > 1 &&
                            personRowIndex !== relationship.persons.length - 1
                              ? `govuk-table__cell ${style.noBorder}`
                              : 'govuk-table__cell'
                          }`}
                        >
                          {person.details}
                        </td>
                      </tr>
                    ));
                })}
            </tbody>
          </table>
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

const getGenderString = (gender: keyof typeof genderMappings): string => {
  return genderMappings[gender];
};

const genderMappings = {
  M: 'Male',
  F: 'Female',
  U: 'Unknown',
  I: 'Indeterminate',
};

export default Relationships;
