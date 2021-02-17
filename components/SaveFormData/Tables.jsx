import TimesCircleIcon from 'components/Icons/TimesCircle';
import Link from 'next/link';

export const DetailedTable = ({ tableHeader, data, deleteForm }) => (
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
      {data.map((cell) => (
        <tr key={'key'} className="govuk-table__row">
          <td className="govuk-table__cell">{`#${cell.data.id}`} </td>
          <td className="govuk-table__cell">
            {`${cell.firstName} ${cell.lastName}`}{' '}
          </td>
          <td className="govuk-table__cell">
            {cell.dateOfBirth &&
              new Date(cell.dateOfBirth).toLocaleDateString('en-GB')}{' '}
          </td>
          <td className="govuk-table__cell">{cell.title} </td>
          <td className="govuk-table__cell"> {cell.timeStamp}</td>
          <td className="govuk-table__cell">
            {
              <Link href={`${cell.step}&continueForm=true`}>
                <a className="govuk-link">Complete</a>
              </Link>
            }
          </td>
          <td
            role="button"
            className="govuk-table__cell"
            onClick={() => deleteForm(cell.formPath)}
          >
            <TimesCircleIcon color="danger" />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const StandardTable = ({ tableHeader, data, deleteForm }) => (
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
      {data.map((cell) => (
        <tr key={cell.formPath} className="govuk-table__row">
          <td className="govuk-table__cell">{cell.title} </td>
          <td className="govuk-table__cell"> {cell.timeStamp}</td>
          <td className="govuk-table__cell">
            {
              <Link href={`${cell.step}?continueForm=true`}>
                <a className="govuk-link">Complete</a>
              </Link>
            }
          </td>
          <td
            role="button"
            className="govuk-table__cell"
            onClick={() => deleteForm(cell.formPath)}
          >
            <TimesCircleIcon color="danger" />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
