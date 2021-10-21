import Button from 'components/Button/Button';
import Heading from 'components/MashHeading/Heading';
import Steps from 'components/NumberedSteps/Steps';

const ScreeningDecision = (): React.ReactElement => (
  <>
    <h1>Make screening decision</h1>
    <Heading clientname="Jan Smith" timeleft="3 hours" datetime="10:00 6 Jun" />
    <Steps />
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
