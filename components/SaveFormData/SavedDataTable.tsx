import Link from 'next/link';

import TimesCircleIcon from 'components/Icons/TimesCircle';
import { SavedData } from 'utils/saveData';

interface Props {
  tableHeader: Array<string>;
  savedData: Array<SavedData>;
  deleteForm: (arg0: string) => void;
}

const SavedDataTable = ({
  tableHeader,
  savedData,
  deleteForm,
}: Props): React.ReactElement => (
  <table className="govuk-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        {tableHeader.map((text) => (
          <th key={text} className="govuk-table__header">
            {text}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="govuk-table__body">
      {savedData.map((record) => (
        <tr key={'key'} className="govuk-table__row">
          {record.personDetails && (
            <>
              <td className="govuk-table__cell">
                {`#${record.personDetails.id}`}{' '}
              </td>
              <td className="govuk-table__cell">
                {`${record.personDetails.firstName} ${record.personDetails.lastName}`}{' '}
              </td>
              <td className="govuk-table__cell">
                {record.personDetails.dateOfBirth &&
                  new Date(record.personDetails.dateOfBirth).toLocaleDateString(
                    'en-GB'
                  )}{' '}
              </td>
            </>
          )}
          <td className="govuk-table__cell">{record.title} </td>
          <td className="govuk-table__cell"> {record.timestamp}</td>
          <td className="govuk-table__cell">
            {
              <Link
                href={`${record.step}${
                  record.step.indexOf('?') === -1 ? '?' : '&'
                }continueForm=true`}
              >
                <a className="govuk-link">Complete</a>
              </Link>
            }
          </td>
          <td
            role="button"
            className="govuk-table__cell"
            onClick={() => deleteForm(record.formPath)}
          >
            <TimesCircleIcon color="danger" />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SavedDataTable;
