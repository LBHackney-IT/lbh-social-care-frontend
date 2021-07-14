export type Filter = 'all' | 'major';

interface FilterButtonProps {
  value: Filter;
  children: React.ReactChild;
  filter: Filter;
  setFilter: (value: Filter) => void;
}

const FilterButton = ({
  value,
  children,
  filter,
  setFilter,
}: FilterButtonProps): React.ReactElement => (
  <div className="govuk-radios__item">
    <input
      className="govuk-radios__input"
      id={`filter-${value}`}
      name="filter"
      type="radio"
      value="all"
      checked={filter === value}
      onChange={() => setFilter(value)}
    />
    <label
      className="govuk-radios__label lbh-body-s"
      htmlFor={`filter-${value}`}
    >
      {children}
    </label>
  </div>
);

export default FilterButton;
