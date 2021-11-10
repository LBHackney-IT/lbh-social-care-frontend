import s from './SuccessSummary.module.scss';

export interface Props {
  title: string;
  body: Record<string, string>;
  referralLink: string;
}

const SuccessSummary = ({
  title,
  body,
  referralLink,
}: Props): React.ReactElement => {
  return (
    <div
      className={s.successSummary}
      aria-labelledby="success-summary-title"
      role="alert"
      tabIndex={-1}
      data-module="govuk-success-summary"
    >
      <h2 className={s.summaryTitle}>{title}</h2>
      <div className={s.summaryBody}>
        <ul>
          {Object.keys(body)
            .filter((x) => x !== 'title' && x !== 'link')
            .map((key, index) => (
              <li key={index}>
                {key} - {body[key]}
              </li>
            ))}
        </ul>
      </div>
      <a href={referralLink} data-testid="referral-link">
        Referral link
      </a>
    </div>
  );
};

export default SuccessSummary;
