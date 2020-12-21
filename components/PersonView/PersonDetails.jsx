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
}) => {
  const [expandDetails, setExpandDetails] = useState(false);
  const address = addressList?.find(
    ({ displayAddressFlag }) => displayAddressFlag === 'Y'
  );
  return (
    <>
      <div>
        <div className="lbh-table-header">
          <h2 className="govuk-fieldset__legend--m govuk-custom-text-color">
            {expandView ? `${firstName} ${lastName}` : 'PERSON DETAILS'}
          </h2>
          {expandView && (
            <div
              className="govuk-link"
              role="button"
              onClick={() => setExpandDetails(!expandDetails)}
            >
              {expandDetails ? 'Collapse' : 'Expand'} view
            </div>
          )}
        </div>
        <hr className="govuk-divider" />
        {(!expandView || expandDetails) && (
          <>
            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Mosaic ID:</dt>
                <dd className="govuk-summary-list__value">#{mosaicId}</dd>
              </div>
              {dateOfBirth && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Date of birth</dt>
                  <dd className="govuk-summary-list__value">
                    {new Date(dateOfBirth).toLocaleDateString('en-GB')}
                  </dd>
                </div>
              )}
              {nhsNumber && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">NHS number</dt>
                  <dd className="govuk-summary-list__value">{nhsNumber}</dd>
                </div>
              )}
              {nationality && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Nationality</dt>
                  <dd className="govuk-summary-list__value">{nationality}</dd>
                </div>
              )}
              {gender && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Gender</dt>
                  <dd className="govuk-summary-list__value">{gender}</dd>
                </div>
              )}
              {address?.addressLine1 && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Address</dt>
                  <dd className="govuk-summary-list__value">
                    <p>{address.addressLine1}</p>
                  </dd>
                </div>
              )}
              {phoneNumber?.length > 0 && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Phone Number</dt>
                  <dd className="govuk-summary-list__value">
                    <ul>
                      {phoneNumber.map(({ phoneNumber, phoneType }) => (
                        <li>
                          {phoneNumber} <span>- {phoneType}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </>
        )}
      </div>
    </>
  );
};
PersonDetails.propTypes = {
  expandView: PropTypes.bool,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  mosaicId: PropTypes.string,
  dateOfBirth: PropTypes.string,
  nhsNumber: PropTypes.string,
  nationality: PropTypes.string,
  gender: PropTypes.string,
  addressList: PropTypes.arrayOf(PropTypes.shape({})),
  phoneNumber: PropTypes.arrayOf(PropTypes.shape({})),
};
export default PersonDetails;
