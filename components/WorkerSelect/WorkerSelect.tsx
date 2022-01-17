import React, { Dispatch, SetStateAction } from 'react';
import { WorkerSearchResult } from 'types';
import s from './WorkerSelect.module.scss';

interface ChoiceProps {
  value: number;
  name: string;
  label: string;
  idToAdd: number;
  setIdToAdd: Dispatch<SetStateAction<number>>;
}

const Choice = ({
  value,
  name,
  label,
  idToAdd,
  setIdToAdd,
}: ChoiceProps): React.ReactElement => (
  <div className={`govuk-radios__item ${s.workerResult}`}>
    <input
      className="govuk-radios__input"
      id={`${name}-${value}`}
      name={name}
      type="radio"
      value={value}
      aria-describedby={`${name}-${value}-hint`}
      checked={idToAdd === value}
      onChange={() => setIdToAdd(value)}
    />

    <label
      className={`govuk-radios__label lbh-body-s ${s.name}`}
      htmlFor={`${name}-${value}`}
    >
      {label}
    </label>
  </div>
);

interface Props {
  label: string;
  workers: WorkerSearchResult[];
  idToAdd: number;
  setIdToAdd: Dispatch<SetStateAction<number>>;
}

const WorkerSelect = ({
  label,
  workers,
  idToAdd,
  setIdToAdd,
}: Props): React.ReactElement => {
  if (workers.length === 0) return <p>No results</p>;

  return (
    <div className="govuk-form-group lbh-form-group">
      <fieldset className="govuk-fieldset">
        <legend className="govuk-label lbh-label">{label}</legend>
        <div
          className={`govuk-radios govuk-radios--small lbh-radios ${s.workerList}`}
        >
          {workers.map((worker) => (
            <Choice
              name="person"
              label={`${worker.firstName} ${worker.lastName}`}
              value={worker.id}
              idToAdd={idToAdd}
              setIdToAdd={setIdToAdd}
              key={worker.id}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default WorkerSelect;
