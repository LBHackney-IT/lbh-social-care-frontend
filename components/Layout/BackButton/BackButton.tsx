const BackButton = (): React.ReactElement => (
  <div className="lbh-container">
    <a
      className="govuk-back-link lbh-back-link lbh-link--no-visited-state"
      href="#"
      onClick={() => window.history.back()}
    >
      Go back
    </a>
  </div>
);

export default BackButton;
