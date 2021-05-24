import Seo from 'components/Layout/Seo/Seo';

const Maintenance = (): React.ReactElement => (
  <>
    <Seo title="Maintenance mode" />
    <h1>Sorry, the service is unavailable</h1>
    <p className="govuk-body"></p>
  </>
);

export default Maintenance;
