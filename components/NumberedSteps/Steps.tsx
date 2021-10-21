import s from './NumberedSteps.module.scss';
import { Select } from 'components/Form';

const NumberedSteps = (): React.ReactElement => (
  <>
    <ol className={s.steps}>
      <li className={s.steps__event}>
        <h3 className="lbh-heading-h3">Document the decision</h3>
        <p className="lbh-body">
          Write the rationale for your screening decision.
        </p>
        <p className="lbh-body">
          <a href="#" className="lbh-link lbh-link--no-visited-state">
            See Google document
          </a>
        </p>
      </li>
      <li className={s.steps__event}>
        <label htmlFor="screening-decision" className="lbh-heading-h3">
          Select screening decision
        </label>
        <Select
          id="screening-decision"
          name="screening-decision"
          ignoreValue
          options={['option 1', 'option 2']}
        />
      </li>
      <li className={s.steps__event}>
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
      </li>
    </ol>
  </>
);

export default NumberedSteps;
