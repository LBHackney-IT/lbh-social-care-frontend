import { useState, useEffect } from 'react';
import { getResident } from 'utils/api/residents';

const PersonView = ({ personId }) => {
  const [person, setPerson] = useState();

  const getPerson = async (personId) => {
    try {
      const data = await getResident(personId);
      setPerson(data);
    } catch {
      console.log('error');
    }
  };
  useEffect(() => {
    getPerson(personId);
  }, [personId]);

  return (
    <>
      <h1>View Person</h1>
      <h2 className="personDetails">PERSON DETAILS</h2>
      <br />
      <dl className="govuk-summary-list  lbh-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <h3>
              {console.log({ person })}
              {person?.firstName} {person?.lastName}
            </h3>
          </dt>
          <dd className="govuk-summary-list__value"></dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Date of birth</dt>
          <dd className="govuk-summary-list__value">
            {new Date(person?.dateOfBirth).toLocaleDateString('en-GB')}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Mosaic ID</dt>
          <dd className="govuk-summary-list__value">{person?.mosaicId}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Gender</dt>
          <dd className="govuk-summary-list__value">{person?.gender}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">NHS Number</dt>
          <dd className="govuk-summary-list__value">{person?.nhsNumber}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Nationality</dt>
          <dd className="govuk-summary-list__value">{person?.nationality}</dd>
        </div>

        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">
            <h3>Contact Information</h3>
          </dt>
          <dd className="govuk-summary-list__value"> </dd>
        </div>

        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Address</dt>
          <dd class="govuk-summary-list__value">
            {person?.addressList &&
              Object.values(person?.addressList[0]).map((addressLine) => (
                <p>{addressLine}</p>
              ))}
          </dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">PhoneNumber</dt>
          <dd className="govuk-summary-list__value">
            {person?.phoneNumber &&
              Object.values(person?.phoneNumber[0]).map((number) => (
                <p>{number}</p>
              ))}
          </dd>
        </div>
      </dl>
      <style jsx>{`
        :global(.personDetails) {
          color: #00513f;
        }
      `}</style>
    </>
  );
};

export default PersonView;
