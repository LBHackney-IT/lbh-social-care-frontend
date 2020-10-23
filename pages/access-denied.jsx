import { NextSeo } from 'next-seo';

export default function AccessDenied() {
  return (
    <div>
      <NextSeo title="Access Denied" noindex={true} />
      <h1>Access denied</h1>
      <p className="govuk-body">
        Sorry, but access to that page is for administrators only.
      </p>
    </div>
  );
}

AccessDenied.propTypes = {};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
