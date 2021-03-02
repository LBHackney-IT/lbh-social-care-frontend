import Seo from 'components/Layout/Seo/Seo';

const AccessDenied = () => (
  <>
    <Seo title="Access Denied" />
    <h1>Access denied</h1>
    <p className="govuk-body">
      Sorry, but access to that page is for administrators only.
    </p>
  </>
);

export default AccessDenied;
