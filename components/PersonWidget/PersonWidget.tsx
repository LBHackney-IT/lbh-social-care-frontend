import React from 'react';
import { Resident } from 'types';
import s from '../styles/PersonWidget.module.scss';
import { format } from 'date-fns';

const prettyDate = (isoDateString: string): string => {
  const parsed = new Date(isoDateString);
  return parsed ? format(parsed, 'd MMM yyyy') : '';
};

interface Props {
  person: Resident | false;
}

const PersonWidget = ({ person }: Props): React.ReactElement => {
  if (person) {
    return (
      <aside className={s.aside}>
        <h2 className={`lbh-heading-h3 ${s.title}`}>
          {person.firstName} {person.lastName}
        </h2>

        <p className={`lbh-body-s ${s.paragraph}`}>Referred 12 Feb 2021</p>
        <p className={`lbh-body-s ${s.paragraph}`}>
          Born {prettyDate(person.dateOfBirth ?? '')}
        </p>
        <p className={`lbh-body-s ${s.paragraph}`}>Allocated to Namey McName</p>

        <p className={`lbh-body-s ${s.important}`}>
          <strong>1 warning</strong> <span>2 open actions</span>
        </p>
      </aside>
    );
  }

  return (
    <aside className={s.aside}>
      <p className="lbh-body">Person not found</p>
    </aside>
  );
};

export default PersonWidget;
