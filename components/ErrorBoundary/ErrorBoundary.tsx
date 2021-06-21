import { withRouter, Router } from 'next/router';
import { ReactNode, Component } from 'react';

import styles from './ErrorBoundary.module.scss';

type ErrorBoundaryProps = Record<string, unknown> & {
  router: Router;
};
type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundaryComponent extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render(): ReactNode {
    const { router, children } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <div
          className="govuk-error-summary optional-extra-class lbh-error-summary"
          aria-labelledby="error-summary-title"
          role="alert"
          tabIndex={-1}
          data-module="govuk-error-summary"
        >
          <h2 className="govuk-error-summary__title" id="error-summary-title">
            A system error has occurred
          </h2>
          <div className="govuk-error-summary__body">
            <p>
              Try your request again. If the error persists, contact us via the{' '}
              <a href={process.env.NEXT_PUBLIC_FEEDBACK_LINK}>feedback form</a>.
              Please include the information below in your feedback so we can
              fully understand how to resolve the problem.
            </p>
            <ul className="govuk-list govuk-error-summary__list">
              <li>
                Error message:{' '}
                <span className={styles.errorMessage}>
                  {error.message || 'An unknown error has occurred'}
                </span>
              </li>
              <li>
                Page URL:{' '}
                <span className={styles.errorMessage}>{router.asPath}</span>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return children;
  }
}

export const ErrorBoundary = withRouter(ErrorBoundaryComponent);
