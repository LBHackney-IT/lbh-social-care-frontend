import { CaseStatusFields, CaseStatus, CaseStatusAnswerDisplay } from 'types';
import {
  CaseStatusSelectOptionLookup,
  CaseStatusOptionMapping,
} from './caseStatusHelper';

interface Props {
  tableName?: string;
  styleType?: string;
  status: CaseStatus;
  answers?: CaseStatusAnswerDisplay;
  sheduledStatus?: CaseStatusAnswerDisplay[];
  currentStatus?: CaseStatusAnswerDisplay[];
}

const CaseStatusDetailsTable = ({
  tableName,
  styleType,
  status,
  answers,
  sheduledStatus,
  currentStatus,
}: Props): React.ReactElement => {
  if (!status) {
    return <></>;
  }

  const htmlElements = [];

  if (status.type.toUpperCase() == 'CP' || status.type.toUpperCase() == 'CIN') {
    const start_date = status.startDate;
    const end_date = status.endDate;

    start_date &&
      !end_date &&
      htmlElements.push(
        <>
          <dt className="govuk-summary-list__key ">Start date</dt>
          <dd className="govuk-summary-list__value" data-testid="start_date">
            {new Date(start_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </dd>
        </>
      );

    start_date &&
      end_date &&
      htmlElements.push(
        <>
          <dt className="govuk-summary-list__key">Dates</dt>
          <dd
            className="govuk-summary-list__value"
            data-testid="start_end_date"
          >
            {new Date(start_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}{' '}
            -{' '}
            {new Date(end_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </dd>
        </>
      );
  } else if (status.type.toUpperCase() == 'LAC') {
    let start_date = status.startDate;
    let end_date = status.endDate;

    console.log(answers);

    if (!sheduledStatus && answers?.startDate && !answers.endDate) {
      start_date = answers.startDate;
    }

    if (answers?.startDate && !answers.endDate && status.endDate) {
      end_date = status.endDate;
    }

    if (answers?.startDate && answers.endDate) {
      start_date = answers.startDate;
      end_date = answers.endDate;
    }

    if (
      sheduledStatus &&
      answers &&
      status?.startDate &&
      sheduledStatus[0].startDate
    ) {
      start_date = answers.startDate;
      end_date = sheduledStatus[0].startDate;
    }

    if (
      answers &&
      answers.status.length > 2 &&
      answers?.startDate &&
      !answers.endDate &&
      status.endDate
    ) {
      end_date = status.endDate;
    }

    if (currentStatus && !end_date && !answers?.endDate && !status.endDate) {
      end_date = currentStatus[0].startDate;
    }

    start_date &&
      !end_date &&
      htmlElements.push(
        <>
          <dt className="govuk-summary-list__key ">Start date</dt>
          <dd className="govuk-summary-list__value" data-testid="start_date">
            {new Date(start_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </dd>
        </>
      );

    start_date &&
      end_date &&
      htmlElements.push(
        <>
          <dt className="govuk-summary-list__key">Dates</dt>
          <dd
            className="govuk-summary-list__value"
            data-testid="start_end_date"
          >
            {new Date(start_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}{' '}
            -{' '}
            {new Date(end_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </dd>
        </>
      );
  }

  return (
    <>
      {tableName && (
        <h2 className={`${styleType}`} data-testid="case_status_table_title">
          {tableName}
        </h2>
      )}
      <dl
        key={`table_${styleType}`}
        className={`govuk-summary-list lbh-summary-list ${styleType}`}
        data-testid="case_status_details_table"
      >
        {htmlElements.map((elm) => {
          return (
            <div className="govuk-summary-list__row" key={`table_${styleType}`}>
              {' '}
              {elm}
            </div>
          );
        })}

        {answers &&
          answers?.status.length > 0 &&
          answers?.status &&
          answers.status.map((answer: CaseStatusFields) => (
            <div
              className="govuk-summary-list__row"
              key={`${status.id} ${answer.option} ${answer.value} ${answer.createdAt}`}
              data-testid="case_status_fields"
            >
              <dt className="govuk-summary-list__key">
                {
                  CaseStatusOptionMapping[
                    answer.option as keyof typeof CaseStatusOptionMapping
                  ]
                }
              </dt>
              <dd className="govuk-summary-list__value">
                {CaseStatusSelectOptionLookup(answer.value, answer.option)}
              </dd>
            </div>
          ))}

        {status.notes && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Notes</dt>
            <dd className="govuk-summary-list__value">{status.notes}</dd>
          </div>
        )}
      </dl>
    </>
  );
};

export default CaseStatusDetailsTable;
