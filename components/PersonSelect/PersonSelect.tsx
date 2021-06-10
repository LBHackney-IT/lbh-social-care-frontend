import React from 'react';
import s from '../styles/PersonSelect.module.scss';
import { Resident } from 'types';
// import { prettyDate } from "../lib/formatters"

interface ChoiceProps {
  value: string;
  name: string;
  label: string;
  hint: string;
}

const Choice = ({
  value,
  name,
  label,
  hint,
}: ChoiceProps): React.ReactElement => (
  <div className={`govuk-radios__item ${s.personResult}`}>
    <input
      className="govuk-radios__input"
      id={`${name}-${value}`}
      name={name}
      type="radio"
      value={value}
      aria-describedby={`${name}-${value}-hint`}
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
  people: Person[];
}

const PersonSelect = ({ label, people }: Props): React.ReactElement => (
  <div className="govuk-form-group lbh-form-group">
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
            hint={`Born ${prettyDate(person.dateOfBirth)} · ${
              person.addressList[0]?.addressLine1
            }`}
            {...people}
          />
        ))}
      </div>
    </fieldset>
  </div>
);

export default PersonSelect;
