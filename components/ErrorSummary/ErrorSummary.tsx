export interface Props {
  title?: string;
  body?: React.ReactChild;
  role?: string;
  links?: Array<{
    text: string;
    href: string;
  }>;
}

const ErrorSummary = ({
  title,
  body,
  links,
  role = 'alert',
}: Props): React.ReactElement => (
  <div
    className="govuk-error-summary"
    aria-labelledby="error-summary-title"
    role={role}
    tabIndex={-1}
    data-module="govuk-error-summary"
  >
    <h2 className="govuk-error-summary__title" id="error-summary-title">
      {title}
    </h2>
    <div className="govuk-error-summary__body">
      {body}
      {links && links.length > 0 && (
        <ul className="govuk-list govuk-error-summary__list">
          {links.map(({ href, text }) => (
            <li key={href}>
              <a href={href}>{text}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default ErrorSummary;
