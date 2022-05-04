interface Props {
  phase: string;
  faqLink: string;
  handbookLink: string;
}

const PhaseBanner = ({
  phase,
  faqLink,
  handbookLink,
}: Props): React.ReactElement => (
  <div className="govuk-phase-banner lbh-phase-banner lbh-container">
    <p className="govuk-phase-banner__content">
      <strong className="govuk-tag govuk-phase-banner__content__tag">
        {phase}
      </strong>
      <span className="govuk-phase-banner__text">
        Need help? Check out the{' '}
        <a
          className="lbh-link lbh-link--no-visited-state"
          target="_blank"
          rel="noreferrer noopener"
          href={faqLink}
        >
          FAQ
        </a>{' '}
        or the{' '}
        <a
          className="lbh-link lbh-link--no-visited-state"
          target="_blank"
          rel="noreferrer noopener"
          href={handbookLink}
        >
          handbook
        </a>
        . If you don&apos;t find the answer, contact{' '}
        <a href="mailto:social-care.support@hackney.gov.uk">support</a>{' '}
      </span>
    </p>
  </div>
);

export default PhaseBanner;
