import React from 'react';
import s from './PersonSelect.module.scss';
import { LegacyResident } from 'types';
import { format } from 'date-fns';

interface ChoiceProps {
  value: string | number;
  name: string;
  label: string;
  hint: string;
  selectedPerson: LegacyResident;
  setSelectedPerson: (value: LegacyResident) => void;
}

const Choice = ({
  value,
  name,
  label,
  hint,
  selectedPerson,
  setSelectedPerson,
}: ChoiceProps): React.ReactElement => (
  <div className={`govuk-radios__item ${s.personResult}`}>
    <input
      className="govuk-radios__input"
      id={`${name}-${value}`}
      name={name}
      type="radio"
      value={value}
      aria-describedby={`${name}-${value}-hint`}
      checked={selectedPerson.mosaicId === value}
      onChange={(e) => setSelectedPerson()}
    />

    <label
      className={`govuk-radios__label lbh-body-s ${s.name}`}
      htmlFor={`${name}-${value}`}
    >
      {label}
    </label>

    <p id={`${name}=${value}-hint`} className={`lbh-body-xs ${s.meta}`}>
      {hint}
    </p>
  </div>
);

interface Props {
  label: string;
  name: string;
  people: LegacyResident[];
  selectedPerson: LegacyResident;
  setSelectedPerson: (value: LegacyResident) => void;
}

const PersonSelect = ({ label, people }: Props): React.ReactElement => (
  <div className="govuk-form-group lbh-form-group">
    {console.log(people)}
    <fieldset className="govuk-fieldset" aria-describedby="example-hint">
      <legend className="govuk-label lbh-label">{label}</legend>
      <div
        className={`govuk-radios govuk-radios--small lbh-radios ${s.personList}`}
      >
        {people.map((person) => (
          <Choice
            name="person"
            label={`${person.firstName} ${person.lastName}`}
            value={person.mosaicId}
            key={person.mosaicId}
            hint={`#${person.mosaicId} · Born ${format(
              new Date(String(person.dateOfBirth)),
              'd MMM yyyy'
            )} · ${person.address?.address}`}
            {...people}
          />
        ))}
      </div>
    </fieldset>
  </div>
);

export default PersonSelect;
