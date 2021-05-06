import { Case } from 'types';
import { formatDate, isDateValid } from 'utils/date';

import CaseLink from './CaseLink';

const CaseNotePersonId = ({ personId }: Case) => (
  <td key="personId" className="govuk-table__cell">
    {personId}
  </td>
);

const CaseNoteDate = ({ dateOfEvent, caseFormTimestamp }: Case) => (
  <td
    key="date"
    className="govuk-table__cell govuk--timestamp"
    style={{ width: '120px' }}
  >
    {(dateOfEvent && formatDate(dateOfEvent)) ||
      (caseFormTimestamp && formatDate(caseFormTimestamp))}
  </td>
);

const CaseNoteTitle = ({ formName, caseFormData }: Case) => (
  <td key="title" className="govuk-table__cell">
    {
      <>
        {['ASC_case_note', 'CFS_case_note'].includes(
          caseFormData.form_name_overall
        ) && 'Case Note - '}
        {formName}
        {caseFormData.case_note_title && (
          <div>{caseFormData.case_note_title}</div>
        )}
      </>
    }
  </td>
);

const CaseNoteOfficer = ({ officerEmail }: Case) => (
  <td key="officer" className="govuk-table__cell">
    {officerEmail}
  </td>
);

const CaseNoteAction = ({ recordId, caseFormUrl, caseFormData }: Case) => (
  <td
    key="action"
    className="govuk-table__cell govuk-table__cell--numeric"
    style={{ width: '50px', textAlign: 'center' }}
  >
    <CaseLink
      recordId={recordId}
      externalUrl={caseFormUrl}
      caseFormData={caseFormData}
    />
  </td>
);

const CaseNoteName = ({ firstName, lastName }: Case) => (
  <td key="name" className="govuk-table__cell">
    {firstName} {lastName}
  </td>
);

const CaseNoteBirthday = ({ dateOfBirth }: Case) => (
  <td key="birthday" className="govuk-table__cell">
    {dateOfBirth && isDateValid(dateOfBirth) && dateOfBirth}
  </td>
);

const tableEntities = {
  person_id: { text: 'Person id', component: CaseNotePersonId },
  first_name: { text: 'Client Name', component: CaseNoteName },
  date_of_birth: { text: 'Date of birth', component: CaseNoteBirthday },
  date_of_event: { text: 'Date created', component: CaseNoteDate },
  formName: { text: 'Record type', component: CaseNoteTitle },
  officer_email: { text: 'Created by', component: CaseNoteOfficer },
  action: { text: 'Action', component: CaseNoteAction },
};

export type CaseTableColumns = keyof typeof tableEntities;

interface Props {
  records: Case[];
  columns: CaseTableColumns[];
  sort?: {
    sort_by?: string;
    order_by?: string;
  };
  onSort?: (id: string) => void;
}

const CasesTable = ({
  records,
  columns,
  sort = {},
  onSort,
}: Props): React.ReactElement => (
  <table className="govuk-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        {columns.map((column) => (
          <th
            key={column}
            scope="col"
            className="govuk-table__header"
            role={onSort && 'button'}
            onClick={() => onSort && onSort(column)}
          >
            {tableEntities[column].text}{' '}
            {column === sort.sort_by && (
              <>{sort.order_by === 'desc' ? '🔽' : '🔼'}</>
            )}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="govuk-table__body">
      {records.map((record) => (
        <tr className="govuk-table__row" key={record.recordId}>
          {columns.map((column) => tableEntities[column].component(record))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default CasesTable;
