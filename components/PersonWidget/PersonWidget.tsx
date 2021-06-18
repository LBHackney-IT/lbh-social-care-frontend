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
  person?: Resident;
}

const PersonWidget = ({ person }: Props): React.ReactElement => {
  const dateOfBirth = prettyDate(person?.dateOfBirth ?? '');
  const displayAddress = person?.address || person?.addresses?.[0];

  if (person) {
    return (
      <aside className={s.aside}>
        <h2 className={`lbh-heading-h3 ${s.title}`}>
          {person.firstName} {person.lastName}
        </h2>
        {dateOfBirth && (
          <p className={`lbh-body-s ${s.paragraph}`}>Born {dateOfBirth}</p>
        )}

        {displayAddress && (
          <p className={`lbh-body-s ${s.paragraph}`}>
            {displayAddress.addressLines || displayAddress.address}
            <br />
            {displayAddress.postCode || displayAddress.postcode}
          </p>
        )}
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
