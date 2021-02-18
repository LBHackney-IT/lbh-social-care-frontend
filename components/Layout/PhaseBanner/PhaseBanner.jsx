import PropTypes from 'prop-types';

const PhaseBanner = ({ phase, feedbackLink }) => (
  <div className="govuk-phase-banner">
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

PhaseBanner.propTypes = {
  phase: PropTypes.string.isRequired,
  feedbackLink: PropTypes.string.isRequired,
};

export default PhaseBanner;
