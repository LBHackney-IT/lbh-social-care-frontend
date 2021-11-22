import s from './Contact.module.scss';

const cases = [
  '#786288',
  'Jan Smith',
  '09/12/1972',
  '90 Sesame Street, Hackney, London',
  'E9 6EY',
];

const ContactTable = (): React.ReactElement => (
  <table className={`govuk-table ${s.tableHeading}`}>
    <thead className="govuk-table__head">
      <tr>
        <th className="govuk-table__header">Social care ID</th>
        <th className="govuk-table__header">Client Name</th>
        <th className="govuk-table__header">Date of birth</th>
        <th className="govuk-table__header">Address</th>
        <th className="govuk-table__header">Postcode</th>
      </tr>
    </thead>
    <tbody className={`govuk-table__body ${s.text}`}>
      <tr className="govuk-table__row">
        {cases.map((cell) => (
          <td key={cell} className="govuk-table__cell">
            {cell}{' '}
          </td>
        ))}
      </tr>
    </tbody>
  </table>
);

export default ContactTable;
