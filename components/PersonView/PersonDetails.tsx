import { getEthnicityName } from 'utils/person';
import { Resident, User } from 'types';
import { useAuth } from 'components/UserContext/UserContext';
import { canUserEditPerson } from 'lib/permissions';
import Link from 'next/link';
import s from 'stylesheets/Section.module.scss';
import { format } from 'date-fns';

interface Props {
  person: Resident;
  expandView?: boolean;
}

const PersonDetails = ({ person }: Props): React.ReactElement => {
  const {
    otherNames,
    contextFlag,
    id,
    dateOfBirth,
    nhsNumber,
    firstLanguage,
    religion,
    dateOfDeath,
    sexualOrientation,
    gender,
    address,
    ethnicity,
    phoneNumbers,
    emailAddress,
    preferredMethodOfContact,
  } = person;

  const { user } = useAuth() as { user: User };

  return (
    <>
      <section className="govuk-!-margin-bottom-8">
        <div className={s.heading}>
          <h2>Personal details</h2>
          {canUserEditPerson(user, person) && (
            <Link href={`/people/${id}/edit`}>
              <a className="lbh-link lbh-link--no-visited-state">
                Edit details
              </a>
            </Link>
          )}
        </div>

        <dl className="govuk-summary-list lbh-summary-list">
          {otherNames && otherNames?.length > 0 && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Other names</dt>
              <dd className="govuk-summary-list__value">
                <ul className="govuk-list">
                  {otherNames.map(({ firstName, lastName }) => (
                    <li key={`${firstName} ${lastName}`}>
                      {firstName} {lastName}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Social care ID</dt>
            <dd className="govuk-summary-list__value">#{id}</dd>
          </div>
          {gender && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Gender</dt>
              <dd className="govuk-summary-list__value">{gender}</dd>
            </div>
          )}
          {dateOfBirth && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Date of birth</dt>
              <dd className="govuk-summary-list__value">
                {format(new Date(dateOfBirth), 'dd MMM yyyy')}
              </dd>
            </div>
          )}
          {dateOfDeath && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Date of death</dt>
              <dd className="govuk-summary-list__value">
                {format(new Date(dateOfDeath), 'dd MMM yyyy')}
              </dd>
            </div>
          )}
          {ethnicity && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Ethnicity</dt>
              <dd className="govuk-summary-list__value">
                {getEthnicityName(ethnicity)}
              </dd>
            </div>
          )}
          {firstLanguage && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">First language </dt>
              <dd className="govuk-summary-list__value">{firstLanguage}</dd>
            </div>
          )}
          {religion && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Religion </dt>
              <dd className="govuk-summary-list__value">{religion}</dd>
            </div>
          )}
          {sexualOrientation && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Sexual orientation</dt>
              <dd className="govuk-summary-list__value">{sexualOrientation}</dd>
            </div>
          )}
          {address && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Address</dt>
              <dd className="govuk-summary-list__value">
                {address.address}
                <br />
                {address.postcode}
                <br />
                <a
                  className="lbh-link lbh-link--no-visited-state"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.google.com/maps/dir//${address.address} ${address.postcode}`}
                >
                  Get directions
                </a>
              </dd>
            </div>
          )}
          {phoneNumbers.length > 0 && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Phone number</dt>
              <dd className="govuk-summary-list__value">
                <ul className="lbh-list">
                  {phoneNumbers.map(({ number, type }) => (
                    <li key={number}>
                      <strong>{type}:</strong>{' '}
                      <a
                        href={`tel:${number}`}
                        className="lbh-link lbh-link--no-visited-state"
                      >
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {emailAddress && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Email</dt>
              <dd className="govuk-summary-list__value">
                {emailAddress}
                <br />
                <a href={`mailto:${emailAddress}`}>Send email</a>
              </dd>
            </div>
          )}
          {preferredMethodOfContact && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">
                Preferred method of contact
              </dt>
              <dd className="govuk-summary-list__value">
                {preferredMethodOfContact}
              </dd>
            </div>
          )}
          {contextFlag && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Service area</dt>
              <dd className="govuk-summary-list__value">
                {contextFlag === 'C' ? 'Children' : 'Adults'}
              </dd>
            </div>
          )}
        </dl>
      </section>

      {nhsNumber && (
        <section>
          <h2 className={s.heading}>Medical and health</h2>
          <dl className="govuk-summary-list lbh-summary-list">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">NHS number</dt>
              <dd className="govuk-summary-list__value">{nhsNumber}</dd>
            </div>
          </dl>
        </section>
      )}
    </>
  );
};

export default PersonDetails;
