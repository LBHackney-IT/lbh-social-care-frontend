import PropTypes from 'prop-types';

const AllocatedWorkersEntry = ({
  allocatedTeam,
  allocatedWorker,
  startDate,
  endDate,
  role,
  index,
}) => (
  <>
    <h3 className="govuk-fieldset__legend--m govuk-custom-text-color govuk-!-margin-top-0">
      Allocated Worker {index + 1}
    </h3>
    <hr className="govuk-divider" />
    <dl className="govuk-summary-list">
      {allocatedWorker && (
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Allocated Worker:</dt>
          <dd className="govuk-summary-list__value">{allocatedWorker}</dd>
        </div>
      )}
      {allocatedTeam && (
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Allocated Team</dt>
          <dd className="govuk-summary-list__value">{allocatedTeam}</dd>
        </div>
      )}
      {role && (
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Role</dt>
          <dd className="govuk-summary-list__value">{role}</dd>
        </div>
      )}
      {startDate && (
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Start Date</dt>
          <dd className="govuk-summary-list__value">{startDate}</dd>
        </div>
      )}
      {endDate && (
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">End Date</dt>
          <dd className="govuk-summary-list__value">{endDate}</dd>
        </div>
      )}
    </dl>
  </>
);

const AllocatedWorkersTable = ({ records }) => (
  <table className="govuk-table">
    <tbody className="govuk-table__body">
      {records.map((result, index) => (
        <AllocatedWorkersEntry
          key={result.personId}
          index={index}
          {...result}
        />
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
