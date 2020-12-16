import PropTypes from 'prop-types';

const AllocatedWorkersEntry = ({
  allocatedTeam,
  allocatedWorker,
  startDate,
  endDate,
  role,
}) => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell">{allocatedWorker}</td>
    <td className="govuk-table__cell">{role}</td>
    <td className="govuk-table__cell">{allocatedTeam}</td>
    <td className="govuk-table__cell">{startDate}</td>
    <td className="govuk-table__cell">{endDate}</td>
  </tr>
);

const AllocatedWorkersTable = ({ records }) => (
  <table className="govuk-table">
    <tbody className="govuk-table__body">
      {records.map((result) => (
        <AllocatedWorkersEntry key={result.personId} {...result} />
      ))}
    </tbody>
  </table>
);

AllocatedWorkersTable.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      allocatedWorker: PropTypes.string,
      role: PropTypes.string,
      allocatedTeam: PropTypes.string,
      startDate: PropTypes.number,
      endDate: PropTypes.number,
    })
  ).isRequired,
};

export default AllocatedWorkersTable;
