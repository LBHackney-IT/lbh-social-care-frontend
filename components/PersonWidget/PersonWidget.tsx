import React from 'react';
import { LegacyResident, Resident } from 'types';
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
  person: Resident | LegacyResident;
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
  const dateOfBirth = prettyDate(person?.dateOfBirth ?? '');
  const displayAddress = person?.address;
  const firstAddress = 'id' in person ? person?.addresses?.[0] : person.address;
  if (grouped)
    return (
      <aside className={s.aside}>
        <details className={s.details} open={open}>
          <summary
            className={s.summary}
            onClick={(e) => {
              e.preventDefault();
              setOpen &&
                (open ? setOpen(false) : index !== undefined && setOpen(index));
            }}
          >
            <h2 className={`lbh-heading-h3 ${s.title}`}>
              {person.firstName} {person.lastName}
            </h2>

            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" strokeWidth="3" />
            </svg>
          </summary>

          {dateOfBirth && (
            <p className={`lbh-body-s ${s.paragraph}`}>Born {dateOfBirth}</p>
          )}
          {displayAddress && (
            <p className={`lbh-body-s ${s.paragraph}`}>
              {displayAddress?.address}
              <br />
              {displayAddress?.postcode}
            </p>
          )}
          {firstAddress && (
            <p className={`lbh-body-s ${s.paragraph}`}>
              {'address' in firstAddress
                ? firstAddress.address
                : firstAddress.addressLines}
              <br />
              {'postcode' in firstAddress
                ? firstAddress.postcode
                : firstAddress.postCode}
            </p>
          )}

          <button
            className="lbh-link lbh-body-s"
            onClick={() =>
              onRemove &&
              onRemove(
                'id' in person ? person.id : parseInt(String(person.mosaicId))
              )
            }
          >
            Remove
          </button>
        </details>
      </aside>
    );

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
          {displayAddress?.address}
          <br />
          {displayAddress?.postcode}
        </p>
      )}
      {firstAddress && (
        <p className={`lbh-body-s ${s.paragraph}`}>
          {'address' in firstAddress
            ? firstAddress.address
            : firstAddress.addressLines}
          <br />
          {'postcode' in firstAddress
            ? firstAddress.postcode
            : firstAddress.postCode}
        </p>
      )}
    </aside>
  );
};

export default PersonWidget;
