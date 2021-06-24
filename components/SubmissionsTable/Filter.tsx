interface FilterProps {
  value: 'mine' | 'all';
  children: React.ReactChild;
  filter: string;
  setFilter: (value: 'mine' | 'all') => void;
}

const Filter = ({
  value,
  children,
  filter,
  setFilter,
}: FilterProps): React.ReactElement => (
  <div className="govuk-radios__item">
    <input
      name="filter"
      type="radio"
      className="govuk-radios__input"
      onChange={() => setFilter(value)}
      checked={filter === value}
      id={`filter-${value}`}
    />
    <label
      htmlFor={`filter-${value}`}
      className="govuk-label govuk-radios__label"
    >
      {children}
    </label>
  </div>
);

export default Filter;
