import s from './ActivityTimeline.module.scss';
import Link from 'next/link';
import { useCases } from 'utils/api/cases';
import { prettyCaseDate, prettyCaseTitle } from 'lib/formatters';

interface Props {
  socialCareId: number;
}

const ActivityTimeline = ({
  socialCareId,
}: Props): React.ReactElement | null => {
  const { data } = useCases({
    mosaic_id: socialCareId,
  });

  const activity = data?.[0]?.cases?.slice(0, 3);

  if (activity)
    return (
      <aside className={s.outer}>
        <h3 className="lbh-heading-h5">Activity</h3>
        <ul className="lbh-timeline">
          {activity.map((a) => (
            <li
              key={a.recordId}
              className="lbh-timeline__event lbh-timeline__event--minor"
            >
              <h4 className="lbh-heading-h6">{prettyCaseTitle(a)}</h4>
              <p className="lbh-body-xs">{prettyCaseDate(a)}</p>
            </li>
          ))}
        </ul>

        <Link href={`/residents/${socialCareId}/activity`}>
          <a className="lbh-link lbh-link--muted">See all</a>
        </Link>
      </aside>
    );

  return null;
};

export default ActivityTimeline;
