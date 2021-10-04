import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useCaseStatuses } from 'utils/api/caseStatus';
import {
  Resident,
  CaseStatusFields,
  CaseStatus,
  CaseStatusMapping,
} from 'types';
import styles from './CaseStatusDetails.module.scss';
import Link from 'next/link';
import s from 'stylesheets/Section.module.scss';

interface Props {
  person: Resident;
}

const CaseStatusDetails = ({ person }: Props): React.ReactElement => {
  const { data: caseStatuses, error } = useCaseStatuses(person.id);

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting case status." />
    );
  }

  if (!caseStatuses || caseStatuses?.length === 0) {
    return <></>;
  }
  return (
    <>
      {caseStatuses.map((status: CaseStatus) => {
        return (
          <div
            key={status.id}
            className={styles.caseStatusDesign}
            data-testid="case_status_details"
          >
            <section className="govuk-!-margin-bottom-8">
              <div className={s.heading}>
                <h2>{CaseStatusMapping[status.type]}</h2>
                <Link
                  href={{
                    pathname: `/people/${person.id}/case-status/${status.id}/edit/`,
                    query: { type: status.type },
                  }}
                >
                  Edit
                </Link>
              </div>

              <dl className="govuk-summary-list lbh-summary-list">
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Start date</dt>
                  <dd
                    className="govuk-summary-list__value"
                    data-testid="start_date"
                  >
                    {new Date(status.startDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </dd>
                </div>

                {status.startDate && status.endDate && (
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">Dates</dt>
                    <dd
                      className="govuk-summary-list__value"
                      data-testid="end_date"
                    >
                      {new Date(status.startDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}{' '}
                      -{' '}
                      {new Date(status.startDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </dd>
                  </div>
                )}

                {status.fields &&
                  status.fields?.length > 0 &&
                  status.fields[0].selectedOption && (
                    <div className="govuk-summary-list__row">
                      <dt className="govuk-summary-list__key">
                        Category of need
                      </dt>
                      <dd className="govuk-summary-list__value">
                        <ul className="govuk-list">
                          {status.fields.map((field: CaseStatusFields) => (
                            <li
                              key={`${field.selectedOption.name} ${field.selectedOption.description}`}
                            >
                              {field.selectedOption.name} -{' '}
                              {field.selectedOption.description}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}

                {status.notes && (
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">Notes</dt>
                    <dd className="govuk-summary-list__value">
                      {status.notes}
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          </div>
        );
      })}
    </>
  );
};
export default CaseStatusDetails;
