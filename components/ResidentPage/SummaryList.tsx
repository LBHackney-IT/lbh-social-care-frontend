import s from './SummaryList.module.scss';

interface Props {
  rows: { [key: string]: React.ReactElement | string };
}

const SummaryList = ({ rows }: Props): React.ReactElement => (
  <dl className={`govuk-summary-list lbh-summary-list ${s.summaryList}`}>
    {Object.entries(rows).map(([key, value]) => (
      <div key={key} className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">{key}</dt>
        <dd className="govuk-summary-list__value">{value}</dd>
      </div>
    ))}
  </dl>
);

export default SummaryList;

const RowSkeleton = () => (
  <div aria-hidden="true" className={s.skeletonRow}>
    <div></div>
    <div></div>
  </div>
);

export const SummaryListSkeleton = (): React.ReactElement => (
  <div className={s.skeleton} aria-label="Loading...">
    <RowSkeleton />
    <RowSkeleton />
    <RowSkeleton />
    <RowSkeleton />
    <RowSkeleton />
  </div>
);
