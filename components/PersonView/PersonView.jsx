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
      <h1>View person</h1>
      <h2 className="personDetails">PERSON DETAILS</h2>
      <hr className="personDetailsHr" />
      <dl className="govuk-summary-list--no-border   lbh-summary-list">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <dt
              className="govuk-summary-list__key"
              style={{ display: 'inline-flex' }}
            >
              {person?.firstName} {person?.lastName}
            </dt>
            <dd className="govuk-summary-list__value"></dd>
          </div>
          <div className="govuk-grid-column-one-half">
            <dt className="govuk-summary-list__key">Mosaic ID:</dt>
            <dd className="govuk-summary-list__value">#{person?.mosaicId}</dd>
          </div>
        </div>
        <hr />

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <dt className="govuk-summary-list__key">Date of birth</dt>
            <dd className="govuk-summary-list__value">
              {new Date(person?.dateOfBirth).toLocaleDateString('en-GB')}
            </dd>
          </div>
          <div className="govuk-grid-column-one-half">
            <dt className="govuk-summary-list__key">NHS number</dt>
            <dd className="govuk-summary-list__value">{person?.nhsNumber}</dd>
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <dt className="govuk-summary-list__key">Nationality</dt>
            <dd className="govuk-summary-list__value">{person?.nationality}</dd>
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <dt className="govuk-summary-list__key">Gender</dt>
            <dd className="govuk-summary-list__value">{person?.gender}</dd>
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <dt className="govuk-summary-list__key">
              <h4>Address</h4>
            </dt>
            <dd class="govuk-summary-list__value">
              {person?.addressList &&
                Object.values(person?.addressList[0]).map((addressLine) => (
                  <p>{addressLine}</p>
                ))}
            </dd>
          </div>

          <div className="govuk-grid-column-one-half">
            <dt className="govuk-summary-list__key">PhoneNumber</dt>
            <dd className="govuk-summary-list__value">
              {person?.phoneNumber &&
                Object.values(person?.phoneNumber[0]).map((number) => (
                  <p key={number}>{number}</p>
                ))}
            </dd>
          </div>
        </div>
      </dl>
      <style jsx>{`
        :global(.personDetails) {
          color: #00513f;
        }
        :global(.personDetailsHr) {
          background-color: #00513f;
          height: 2px;
        }
        :global() {
          border: solid 1px black;
        }
      `}</style>
    </>
  );
};

export default PersonView;
