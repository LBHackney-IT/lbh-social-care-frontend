import { ReactNode, Component } from 'react';

import styles from './ErrorBoundary.module.scss';

type ErrorBoundaryProps = Record<string, unknown>;
type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends Component<
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
              Try your request again. If the error persists, please contact{' '}
              <a href="#">Support</a> sharing the current URL and message below:
            </p>
            <ul className="govuk-list govuk-error-summary__list">
              <li className={styles.errorMessage}>
                {error.message || 'An unknown error has occurred'}
              </li>
            </ul>
          </div>
        </div>
      );
    }

    const { children } = this.props;

    return children;
  }
}
