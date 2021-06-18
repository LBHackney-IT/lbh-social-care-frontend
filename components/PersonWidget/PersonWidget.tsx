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
  const displayAddress = person?.address?.address;
  const displayPostcode = person?.address?.postcode;
  const displayAddresses = person?.addresses?.[0];

  if (person) {
    console.log(displayPostcode);
    return (
      <aside className={s.aside}>
        <h2 className={`lbh-heading-h3 ${s.title}`}>
          {person.firstName} {person.lastName}
        </h2>
        {dateOfBirth && (
          <p className={`lbh-body-s ${s.paragraph}`}>Born {dateOfBirth}</p>
        )}
        <p className={`lbh-body-s ${s.paragraph}`}>
          {displayAddress || displayAddresses?.addressLines}
          <br />
          {displayPostcode || displayAddresses?.postCode}
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
