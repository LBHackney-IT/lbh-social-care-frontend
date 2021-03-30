import { useState } from 'react';
import { ExtendedResident } from 'types';
import Collapsible from 'components/Collapsible/Collapsible';

interface Props {
  person: ExtendedResident;
  expandView?: boolean;
}

const PersonDetails = ({
  person: {
    otherNames,
    ageContext,
    firstName,
    lastName,
    mosaicId,
    dateOfBirth,
    nhsNumber,
    firstLanguage,
    religion,
    dateOfDeath,
    sexualOrientation,
    gender,
    address,
    ethnicity,
    phoneNumber,
    email,
    preferredMethodOfContact,
  },
  expandView = false,
}: Props): React.ReactElement => {
  return (
    <Collapsible
      initiallyOpen={true}
      headline={expandView ? `${firstName} ${lastName}` : 'Person details'}
    >
      <>
        <dl className="govuk-summary-list  lbh-summary-list">
          {otherNames && otherNames?.length > 0 && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Other Names</dt>
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
            <dt className="govuk-summary-list__key">Person ID</dt>
            <dd className="govuk-summary-list__value">#{mosaicId}</dd>
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
                {new Date(dateOfBirth).toLocaleDateString('en-GB')}
              </dd>
            </div>
          )}
          {dateOfDeath && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Date Of death</dt>
              <dd className="govuk-summary-list__value">
                {new Date(dateOfDeath).toLocaleDateString('en-GB')}
              </dd>
            </div>
          )}
          {ethnicity && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Ethnicity</dt>
              <dd className="govuk-summary-list__value">{ethnicity}</dd>
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
          {nhsNumber && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">NHS number</dt>
              <dd className="govuk-summary-list__value">{nhsNumber}</dd>
            </div>
          )}
          {address?.address && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Address</dt>
              <dd className="govuk-summary-list__value">{address.address}</dd>
            </div>
          )}
          {phoneNumber && phoneNumber?.length > 0 && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Phone number</dt>
              <dd className="govuk-summary-list__value">
                <ul className="govuk-list">
                  {phoneNumber.map(({ phoneNumber, phoneType }) => (
                    <li key={phoneNumber}>
                      {phoneNumber} - {phoneType}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {email && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Email </dt>
              <dd className="govuk-summary-list__value">{email}</dd>
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
          {ageContext && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Person type</dt>
              <dd className="govuk-summary-list__value">
                {ageContext === 'C' ? 'CFS' : 'ASC'}
              </dd>
            </div>
          )}
        </dl>
      </>
    </Collapsible>
  );
};

export default PersonDetails;
