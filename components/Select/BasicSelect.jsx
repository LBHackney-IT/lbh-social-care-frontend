import PropTypes from 'prop-types';

const BasicSelect = ({ value, onChange = console.log, label, options }) => (
  <div className="govuk-!-margin-bottom-3">
    <div className="govuk-!-margin-bottom-1">
      <label htmlFor={label}>{label}</label>
    </div>
    <select
      id={{ label }}
      value={value}
      onChange={e => {
        onChange(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

BasicSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default BasicSelect;
