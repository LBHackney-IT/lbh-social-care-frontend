import Router from 'next/router';

const BackButton = () => (
  <a className="govuk-back-link" role="button" onClick={() => Router.back()}>
    Back
  </a>
);

export default BackButton;
