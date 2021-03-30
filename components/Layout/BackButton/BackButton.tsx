import Router from 'next/router';

const BackButton = (): React.ReactElement => (
  <a
    className="govuk-back-link lbh-back-link"
    href="#"
    onClick={() => Router.back()}
  >
    Back
  </a>
);

export default BackButton;
