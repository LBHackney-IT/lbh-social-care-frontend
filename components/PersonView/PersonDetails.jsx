import { useState } from 'react';
import PropTypes from 'prop-types';

const PersonDetails = ({
  firstName,
  lastName,
  mosaicId,
  dateOfBirth,
  nhsNumber,
  nationality,
  gender,
  addressList,
  phoneNumber,
  expandView = false,
  nameSize = 'l',
}) => {
  const [expandDetails, setExpandDetails] = useState(false);
  const handleToggle = () => {
    !expandDetails ? setExpandDetails(true) : setExpandDetails(false);
  };
  return (
    <>
      <div className={expandView ? 'govuk-expand-details' : 'govuk-detail'}>
        <h1
          className={`govuk-fieldset__legend--${nameSize} gov-weight-lighter govuk-expand-title`}
        >
          {firstName} {lastName}
        </h1>
        {expandView && !expandDetails ? (
          <span className="govuk-expand-toggle" onClick={handleToggle}>
            Expand view
          </span>
        ) : null}
        {expandView && expandDetails ? (
          <span className="govuk-expand-toggle" onClick={handleToggle}>
            Collapse view
          </span>
        ) : null}
      </div>
      {!expandView | expandDetails ? (
        <div>
          {!expandView ? (
            <>
              <h2 className="govuk-fieldset__legend--m govuk-custom-text-color">
                PERSON DETAILS
              </h2>
              <hr className="govuk-divider" />
            </>
          ) : null}
          <dl className="govuk-summary-list">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Mosaic ID:</dt>
              <dd className="govuk-summary-list__value">#{mosaicId}</dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Date of birth</dt>
              <dd className="govuk-summary-list__value">
                {new Date(dateOfBirth).toLocaleDateString('en-GB')}
              </dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">NHS number</dt>
              <dd className="govuk-summary-list__value">{nhsNumber}</dd>
            </div>

            {nationality && (
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Nationality</dt>
                <dd className="govuk-summary-list__value">{nationality}</dd>
              </div>
            )}
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Gender</dt>
              <dd className="govuk-summary-list__value">{gender}</dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Address</dt>
              <dd className="govuk-summary-list__value">
                {addressList &&
                  Object.values(addressList[0]).map((addressLine) => (
                    <p>{addressLine}</p>
                  ))}
              </dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">PhoneNumber</dt>
              <dd className="govuk-summary-list__value">
                {phoneNumber &&
                  Object.values(phoneNumber[0]).map((number) => (
                    <p key={number}>{number}</p>
                  ))}
              </dd>
            </div>
          </dl>
        </div>
      ) : null}
    </>
  );
};
PersonDetails.propTypes = {
  expandView: PropTypes.bool,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  mosaicId: PropTypes.string,
  dateOfBirth: PropTypes.string,
  nameSize: PropTypes.string,
  nhsNumber: PropTypes.string,
  nationality: PropTypes.string,
  gender: PropTypes.string,
  addressList: PropTypes.arrayOf(PropTypes.shape({})),
  phoneNumber: PropTypes.arrayOf(PropTypes.shape({})),
};

export default PersonDetails;
