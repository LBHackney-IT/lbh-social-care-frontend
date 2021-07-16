import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { removeRelationship, useRelationships } from 'utils/api/relationships';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { ConditionalFeature } from 'lib/feature-flags/feature-flags';
import Link from 'next/link';
import style from './Relationships.module.scss';
import { RelationshipType, Resident, ExistingRelationship } from 'types';
import { RELATIONSHIP_TYPES } from 'data/relationships';
import RemoveRelationshipDialog from '../remove/RemoveRelationshipDialog';
import Router from 'next/router';

interface Props {
  person: Resident;
}

const Relationships = ({ person }: Props): React.ReactElement => {
  const [isRemoveRelationshipDialogOpen, setIsRemoveRelationshipDialogOpen] =
    useState<boolean>(false);
  const [relationshipToRemove, setRelationshipToRemove] =
    useState<ExistingRelationship>();

  const {
    data: { personalRelationships: personalRelationshipsApiResponse } = {},
    error,
  } = useRelationships(person.id);

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting current personal relationships." />
    );
  }

  if (!personalRelationshipsApiResponse) {
    return <Spinner />;
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

      personalRelationships[relationshipTypeIndex].relationships =
        personalRelationships[relationshipTypeIndex].relationships.concat(
          relationshipsOfUnbornChild[0].relationships
        );
    } else if (relationshipsOfUnbornChild.length > 0) {
      personalRelationships.push({
        type: type,
        relationships: relationshipsOfUnbornChild[0].relationships,
      });
    }
  };

  combineOfUnbornChildForType('parent');
  combineOfUnbornChildForType('sibling');

  return (
    <div>
      <RemoveRelationshipDialog
        person={relationshipToRemove}
        isOpen={isRemoveRelationshipDialogOpen}
        onDismiss={() => setIsRemoveRelationshipDialogOpen(false)}
        onFormSubmit={async () => {
          setIsRemoveRelationshipDialogOpen(false);
          if (relationshipToRemove) {
            await removeRelationship(relationshipToRemove.id.toString());
            Router.reload();
          }
        }}
      />
      <div>
        <div className="lbh-table-header">
          <h3 className="govuk-fieldset__legend--m govuk-custom-text-color">
            RELATIONSHIPS
          </h3>
          <ConditionalFeature name="add-relationships">
            <Button
              label="Add a new relationship"
              route={`/people/${person.id}/relationships/add`}
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
                <th scope="col" className="govuk-table__header">
                  Main carer
                </th>
                <th scope="col" className="govuk-table__header">
                  Gender
                </th>
                <th scope="col" className="govuk-table__header">
                  Context of relationship
                </th>
                <th scope="col" className="govuk-table__header">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              {personalRelationships
                .sort((a, b) => b.type.localeCompare(a.type))
                .map((relationship) => {
                  return relationship.relationships
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
                            rowSpan={relationship.relationships.length}
                          >
                            {RELATIONSHIP_TYPES[relationship.type]}
                          </th>
                        )}
                        <td
                          data-testid={`related-person-name-${personRowIndex}`}
                          key={`related-person-name-${personRowIndex}`}
                          className={`${
                            relationship.relationships.length > 1 &&
                            personRowIndex !==
                              relationship.relationships.length - 1
                              ? `govuk-table__cell govuk-!-width-one-quarter ${style.noBorder}`
                              : 'govuk-table__cell govuk-!-width-one-quarter'
                          }`}
                        >
                          {person.personId ? (
                            <Link href={`/people/${person.personId}`}>
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
                            relationship.relationships.length > 1 &&
                            personRowIndex !==
                              relationship.relationships.length - 1
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
                            relationship.relationships.length > 1 &&
                            personRowIndex !==
                              relationship.relationships.length - 1
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
                            relationship.relationships.length > 1 &&
                            personRowIndex !==
                              relationship.relationships.length - 1
                              ? `govuk-table__cell ${style.noBorder}`
                              : 'govuk-table__cell'
                          }`}
                        >
                          {person.details}
                        </td>
                        <ConditionalFeature name="remove-relationship">
                          <td
                            data-testid={`related-person-remove-${personRowIndex}`}
                            key={`related-person-remove-${personRowIndex}`}
                            className={`${
                              relationship.relationships.length > 1 &&
                              personRowIndex !==
                                relationship.relationships.length - 1
                                ? `govuk-table__cell ${style.noBorder}`
                                : 'govuk-table__cell'
                            }`}
                          >
                            <a
                              className="lbh-link lbh-link--no-visited-state"
                              href="#"
                              onClick={() => {
                                setRelationshipToRemove(person);
                                setIsRemoveRelationshipDialogOpen(true);
                              }}
                            >
                              Remove{' '}
                              <span className="govuk-visually-hidden">
                                relationship with {person.firstName}{' '}
                                {person.lastName}
                              </span>
                            </a>
                          </td>
                        </ConditionalFeature>
                      </tr>
                    ));
                })}
            </tbody>
          </table>
        ) : (
          <p className="lbh-body">No relationships found for this person</p>
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
