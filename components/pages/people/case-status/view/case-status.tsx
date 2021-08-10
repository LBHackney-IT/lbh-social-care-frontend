import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { GetCaseStatus } from 'utils/api/caseStatus';
import { useState } from 'react';
import Link from 'next/link';
import style from './Relationships.module.scss';
import { CaseStatus, Resident } from 'types';
import Router from 'next/router';
import s from 'stylesheets/Section.module.scss';

interface Props {
  person: Resident;
}

const CaseStatus = ({ person }: Props): React.ReactElement => {
  const { data: {} = {}, error } = GetCaseStatus(person.id);

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting current personal relationships." />
    );
  }

  if (!GetCaseStatus) {
    return <Spinner />;
  }



  return (
    <>
      <section className="govuk-!-margin-bottom-8">
        <div className={s.heading}>
          <h2>Case Status</h2>

          {/* <Link href={`/people/${person.id}/case-status/add`}>
            <a className="lbh-link lbh-link--no-visited-state">
              Add a new case status
            </a>
          </Link> */}
        </div>

        {
          <table className="govuk-table lbh-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">
                  Type
                </th>
                <th scope="col" className="govuk-table__header">
                  Name
                </th>
                <th scope="col" className="govuk-table__header">
                  Role
                </th>
                <th scope="col" className="govuk-table__header">
                  Gender
                </th>
                <th scope="col" className="govuk-table__header">
                  Context
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
                        className="govuk-table__row lbh-list"
                        key={`${casestatus}-${personRowIndex}`}
                      >
                        {personRowIndex === 0 && (
                          <th
                            data-testid={`${relationship.type}`}
                            scope="row"
                            className="govuk-table__header"
                            rowSpan={relationship.relationships.length}
                            style={{ width: '15%' }}
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
                      </tr>
                    ));
                })}
            </tbody>
          </table>
        ) : (
          <p className="lbh-body">No Case Status found for this person</p>
        )}
      </section>
      {error && <ErrorMessage />}
    </>
  );
};



export default CaseStatus;
