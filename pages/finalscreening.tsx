import Button from 'components/Button/Button';
import Heading from 'components/MashHeading/Heading';

const FinalDecision = (): React.ReactElement => (
  <>
    <h1>Make final decision</h1>
    <Heading clientname="Jan Smith" timeleft="3 hours" datetime="10:00 6 Jun" />
    <h2>Document the decision</h2>
    <p>
      Write the rationale for your screening decision into the google document.
    </p>
    <h2>Select final decision</h2>
    <h2>Select referral category</h2>
    <h2>Allocate out of MASH</h2>
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
        Return to screening
      </p>
    </div>
  </>
);

export default FinalDecision;
