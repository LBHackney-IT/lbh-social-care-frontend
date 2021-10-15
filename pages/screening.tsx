import Button from 'components/Button/Button';
import s from 'stylesheets/Section.module.scss';

const ScreeningDecision = (): React.ReactElement => (
  <>
    <h1>Make screening decision</h1>
    <section className="govuk-!-margin-bottom-8">
      <div className={s.heading}>
        <h3>John Smith</h3>
        <div>
          <span className="govuk-!-margin-right-3">
            {' '}
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
    <h2>Is this contact urgent?</h2>
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
