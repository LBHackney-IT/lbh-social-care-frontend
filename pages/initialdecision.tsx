import Button from 'components/Button/Button';
import Heading from 'components/MashHeading/Heading';

const InitialDecision = (): React.ReactElement => (
  <>
    <h1>Make initial decision</h1>
    <Heading clientname="Jan Smith" timeleft="3 hours" />
    <h2>Document the decision</h2>
    <p>
      Write the rationale for your screening decision into the google document.
    </p>
    <h2>Select initial decision</h2>
    <h2>Select referral category</h2>
    <h2>Is this contact urgent?</h2>
    <h2>(Optional) Assign to worker</h2>
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
        Return to contact
      </p>
    </div>
  </>
);

export default InitialDecision;
