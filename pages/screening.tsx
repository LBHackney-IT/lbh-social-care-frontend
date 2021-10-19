import Button from 'components/Button/Button';
import s from 'stylesheets/Section.module.scss';

const ScreeningDecision = (): React.ReactElement => (
  <>
    <h1>Make screening decision</h1>
    <section className="govuk-!-margin-bottom-8">
      <div className={s.heading}>
        <h2>John Smith</h2>
        <div>
          <span className="govuk-!-margin-right-3">
            recieved at 10:00 6 Jun
          </span>
          <span className="govuk-tag lbh-tag lbh-tag--green">4 hours left</span>
        </div>
      </div>
    </section>
    <h2>Document the decision</h2>
    <p>
      Write the rationale for your screening decision into the google document.
    </p>
    <h2>Select screening decision</h2>
    <div className="govuk-form-group lbh-form-group">
      <select className="govuk-select lbh-select" id="select-1" name="select-1">
        <option value="1">Decision 1</option>
      </select>
    </div>
    <h2>Is this contact urgent?</h2>
    <div className="govuk-form-group lbh-form-group">
      <fieldset className="govuk-fieldset">
        <div
          className="govuk-radios lbh-radios govuk-radios--conditional"
          data-module="govuk-radios"
        >
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
              id="no-input"
              name="no-input"
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
              name="yes-input"
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
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button label="Submit" type="submit" />
      <p
        className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-3`}
      >
        Cancel
      </p>
      <p
        className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-3`}
      >
        Return to initial decision
      </p>
    </div>
  </>
);

export default ScreeningDecision;
