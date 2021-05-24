import Seo from 'components/Layout/Seo/Seo';

const Maintenance = (): React.ReactElement => (
  <>
    <Seo title="Maintenance mode" />
    <h1>Maintenance mode</h1>
    <p className="govuk-body">
      The service is currently being updated. Have a cup of tea and come back
      later.
    </p>
  </>
);

export default Maintenance;
