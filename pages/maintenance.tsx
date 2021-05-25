import Seo from 'components/Layout/Seo/Seo';

const Maintenance = (): React.ReactElement => (
  <>
    <Seo title="Maintenance mode" />
    <h1>Sorry, the service is unavailable</h1>
    <p className="govuk-body">
      You will be able to use the service from 8pm on Tuesday 25 May 2021.
    </p>
  </>
);

export default Maintenance;
