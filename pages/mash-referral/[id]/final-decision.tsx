import Button from 'components/Button/Button';
import Heading from 'components/MashHeading/Heading';
import NumberedSteps from 'components/NumberedSteps/NumberedSteps';
import { Select } from 'components/Form';

const FinalDecision = (): React.ReactElement => (
  <>
    <h1>Make final decision</h1>
    <Heading
      clientname="Jan Smith"
      timeleft="3 hours"
      datetime="2021-11-04T13:50:10.6120000Z"
    />

    <NumberedSteps
      nodes={[
        <>
          <h3 className="lbh-heading-h3">Document the decision</h3>
          <p className="lbh-body">
            Write the rationale for your screening decision.
          </p>
          <p className="lbh-body">
            <a href="#" className="lbh-link lbh-link--no-visited-state">
              See Google document
            </a>
          </p>
        </>,
        <>
          <label htmlFor="screening-decision" className="lbh-heading-h3">
            Select final decision
          </label>
          <Select
            id="initial-decision"
            name="initial-decision"
            ignoreValue
            options={['option 1', 'option 2']}
          />
        </>,
        <>
          <label htmlFor="referral-category" className="lbh-heading-h3">
            Select referral category
          </label>
          <Select
            id="referral-category"
            name="referral-category"
            ignoreValue
            options={['option 1', 'option 2']}
          />
        </>,
        <>
          <label htmlFor="referral-category" className="lbh-heading-h3">
            Allocate out of MASH
          </label>
          <Select
            id="referral-category"
            name="referral-category"
            ignoreValue
            options={['option 1', 'option 2']}
          />
        </>,
        <>
          <fieldset className="govuk-fieldset">
            <legend className="lbh-heading-h3">Is this contact urgent?</legend>
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
                  value="text"
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
                  value="phone"
                  checked
                />
                <label
                  className="govuk-label govuk-radios__label"
                  htmlFor="yes-input"
                >
                  Yes
                </label>
              </div>
              <div className="govuk-radios__conditional" id="hint-email">
                <label className="govuk-label" htmlFor="hint">
                  Please email your MASH manager about the urgent case.
                </label>
              </div>
            </div>
          </fieldset>
        </>,
      ]}
    />

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
          Return to contact
        </a>
      </p>
    </div>
  </>
);

export default FinalDecision;
