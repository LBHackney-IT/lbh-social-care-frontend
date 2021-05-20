import Router from 'next/router';

const BackButton = (): React.ReactElement => (
  <div className="lbh-container">
    <a
      className="govuk-back-link lbh-back-link lbh-link--no-visited-state"
      href="#"
      onClick={() => Router.back()}
    >
      Go back
    </a>
  </div>
);

export default BackButton;
