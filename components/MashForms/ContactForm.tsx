import Button from 'components/Button/Button';
import Heading from 'components/MashHeading/Heading';
import NumberedSteps from 'components/NumberedSteps/NumberedSteps';
import React, { useState } from 'react';
import s from './Contact.module.scss';
import Link from 'next/link';
import MatchBanner from './MatchBanner';
import ContactTable from './ContactTable';

const ContactForm = (): React.ReactElement => {
  const [urgent, setUrgent] = useState(false);
  return (
    <>
      <h1>Work on contact</h1>
      <Heading
        clientname="Jan Smith"
        timeleft="3 hours"
        datetime="2021-11-04T13:50:10.6120000Z"
      />
      <NumberedSteps
        nodes={[
          <>
            <h3 className="lbh-heading-h3">
              Check whether the client exists in the system
            </h3>
            <p className="lbh-body">The client’s details are as follows:</p>
            <div className={s.clientMatch}>
              <ContactTable />
              <MatchBanner />
            </div>
          </>,
          <>
            <h3 className="lbh-heading-h3">Review contact</h3>
            <p className="lbh-body">
              Write the historic data in the document below and perform any
              required checks.
            </p>
            <p className="lbh-body">
              <Link href="#">
                <a>See Google document</a>
              </Link>
            </p>
          </>,
          <>
            <fieldset className="govuk-fieldset">
              <legend className="lbh-heading-h3">
                Is this contact urgent?
              </legend>
              <div
                className="govuk-radios lbh-radios govuk-radios--conditional"
                data-module="govuk-radios"
              >
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="no-input"
                    name="urgency"
                    type="radio"
                    onClick={() => setUrgent(false)}
                    checked={!urgent}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="no-input"
                  >
                    No
                  </label>
                </div>
                <div className="govuk-radios__item">
                  <input
                    className="govuk-radios__input"
                    id="yes-input"
                    name="urgency"
                    type="radio"
                    onClick={() => setUrgent(true)}
                    checked={urgent}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="yes-input"
                  >
                    Yes
                  </label>
                </div>
                {urgent && (
                  <div className="govuk-radios__conditional" id="hint-email">
                    <label className="govuk-label" htmlFor="hint">
                      Please email your MASH manager about the urgent case.
                    </label>
                  </div>
                )}
              </div>
            </fieldset>
          </>,
        ]}
      />{' '}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button label="Submit" type="submit" />
        <p className="lbh-body">
          <a
            href="#"
            className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-3`}
          >
            Cancel
          </a>
        </p>
        <p>
          <a
            href="#"
            className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-3`}
          >
            Delete duplicate referral
          </a>
        </p>
      </div>
    </>
  );
};

export default ContactForm;
