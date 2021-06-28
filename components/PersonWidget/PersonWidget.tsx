import React from 'react';
import { Resident } from 'types';
import s from './PersonWidget.module.scss';
import { format } from 'date-fns';

const prettyDate = (isoDateString: string): string => {
  const parsed = new Date(isoDateString);
  try {
    return format(parsed, 'd MMM yyyy');
  } catch (e) {
    return '';
  }
};

interface Props {
  person: Resident | false;
  grouped?: boolean;
  index?: number;
  onRemove?: (value: number) => void;
  open?: boolean;
  setOpen?: (value: number | false) => void;
}

const PersonWidget = ({
  person,
  grouped,
  onRemove,
  index,
  open,
  setOpen,
}: Props): React.ReactElement => {
  if (grouped && person && onRemove && setOpen && index)
    return (
      <aside className={s.aside}>
        <details className={s.details} open={open}>
          <summary
            className={s.summary}
            onClick={(e) => {
              e.preventDefault();
              open ? setOpen(false) : setOpen(index);
            }}
          >
            <h2 className={`lbh-heading-h3 ${s.title}`}>
              {person.firstName} {person.lastName}
            </h2>

            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" strokeWidth="3" />
            </svg>
          </summary>
          <p className={`lbh-body-s ${s.paragraph}`}>Referred 12 Feb 2021</p>
          <p className={`lbh-body-s ${s.paragraph}`}>
            Born {String(person.dateOfBirth)}
          </p>
          <p className={`lbh-body-s ${s.paragraph}`}>
            Allocated to Namey McName
          </p>

          <p className={`lbh-body-s ${s.important}`}>
            <strong>1 warning</strong> <span>2 open actions</span>
          </p>
          <button
            className="lbh-link lbh-body-s"
            onClick={() => onRemove(index)}
          >
            Remove
          </button>
        </details>
      </aside>
    );

  if (person)
    return (
      <aside className={s.aside}>
        <h2 className={`lbh-heading-h3 ${s.title}`}>
          {person.firstName} {person.lastName}
        </h2>

        <p className={`lbh-body-s ${s.paragraph}`}>Referred 12 Feb 2021</p>
        <p className={`lbh-body-s ${s.paragraph}`}>
          Born {prettyDate(String(person.dateOfBirth))}
        </p>
        <p className={`lbh-body-s ${s.paragraph}`}>Allocated to Namey McName</p>

        <p className={`lbh-body-s ${s.important}`}>
          <strong>1 warning</strong> <span>2 open actions</span>
        </p>
      </aside>
    );

  return (
    <aside className={s.aside}>
      <p className="lbh-body">Person not found</p>
    </aside>
  );
};

export default PersonWidget;
