interface Props {
  phase: string;
  feedbackLink: string;
}

const PhaseBanner = ({ phase, feedbackLink }: Props): React.ReactElement => (
  <div className="govuk-phase-banner lbh-phase-banner lbh-container">
    <p className="govuk-phase-banner__content">
      <strong className="govuk-tag govuk-phase-banner__content__tag">
        {phase}
      </strong>
      <span className="govuk-phase-banner__text">
        This is a new service – your{' '}
        <a className="govuk-link" href={feedbackLink}>
          feedback
        </a>{' '}
        will help us to improve it.
      </span>
    </p>
  </div>
);

export default PhaseBanner;
