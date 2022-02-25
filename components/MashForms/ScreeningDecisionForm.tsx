import { AxiosError } from 'axios';
import Button from 'components/Button/Button';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { Select } from 'components/Form';
import Heading from 'components/MashHeading/Heading';
import NumberedSteps from 'components/NumberedSteps/NumberedSteps';
import screeningOptions from 'data/mashOptions/screeningOptions';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MashReferral } from 'types';
import { submitScreeningDecision } from 'utils/api/mashReferrals';

interface Props {
  referral: MashReferral;
  workerEmail: string;
}

const ScreeningDecisionForm = ({
  referral,
  workerEmail,
}: Props): React.ReactElement => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [screeningDecision, setScreeningDecision] = useState('NFA');
  const [urgencyScreeningDecision, setUrgencyScreeningDecision] =
    useState(false);

  const router = useRouter();

  const confirmation = {
    title: `A decision has been submitted for ${referral.mashResidents
      .map((resident) => `${resident.firstName} ${resident.lastName}`)
      .join(' and ')}`,
    link: referral.referralDocumentURI,
  };

  const submitForm = async () => {
    setSubmitting(true);
    setErrorMessage('');

    try {
      await submitScreeningDecision(
        referral.id,
        workerEmail,
        screeningDecision,
        urgencyScreeningDecision
      );

      router.push({
        pathname: `/team-assignments`,
        query: {
          tab: 'screening-decision',
          confirmation: JSON.stringify(confirmation),
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError;

      setSubmitting(false);
      setErrorMessage(axiosError.response?.data);
    }
  };

  return (
    <>
      <h1>Make screening decision</h1>
      <Heading mashReferral={referral} />
      <NumberedSteps
        nodes={[
          <>
            <h3 className="lbh-heading-h3">Document the decision</h3>
            <p className="lbh-body">
              Write the rationale for your screening decision.
            </p>
            <p className="lbh-body">
              <a
                href={referral.referralDocumentURI}
                rel="noopener noreferrer"
                target="_blank"
                className="lbh-link lbh-link--no-visited-state"
              >
                See Google document
              </a>
            </p>
          </>,
          <>
            <label htmlFor="screening-decision" className="lbh-heading-h3">
              Select screening decision
            </label>
            <Select
              id="screening-decision"
              name="screening-decision"
              value={screeningDecision}
              options={screeningOptions}
              onChange={(value) => setScreeningDecision(value)}
            />
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
                    value="no"
                    checked={!urgencyScreeningDecision}
                    onChange={(el) =>
                      setUrgencyScreeningDecision(el.target.value === 'yes')
                    }
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
                    value="yes"
                    checked={urgencyScreeningDecision}
                    onChange={(el) =>
                      setUrgencyScreeningDecision(el.target.value === 'yes')
                    }
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor="yes-input"
                  >
                    Yes
                  </label>
                </div>
                {urgencyScreeningDecision && (
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
      />
      {errorMessage && <ErrorMessage label={errorMessage} />}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          label="Submit"
          type="submit"
          onClick={submitForm}
          disabled={submitting}
        />
        <p className="lbh-body">
          <a
            href="#"
            className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-3`}
            onClick={() => router.back()}
          >
            Cancel
          </a>
        </p>
        <p>
          <a
            href="#"
            className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-3`}
          >
            Return to initial decision
          </a>
        </p>
      </div>
    </>
  );
};

export default ScreeningDecisionForm;
