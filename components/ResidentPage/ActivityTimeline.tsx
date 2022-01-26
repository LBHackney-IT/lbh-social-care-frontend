import s from './ActivityTimeline.module.scss';
import Link from 'next/link';

const ActivityTimeline = (): React.ReactElement => (
  <aside className={s.outer}>
    <h3 className="lbh-heading-h5">Activity</h3>
    <ul className="lbh-timeline">
      <li className="lbh-timeline__event lbh-timeline__event--minor">
        <h4 className="lbh-heading-h6">Updated by Namey McName</h4>
        <p className="lbh-body-xs">10 August 2019</p>
      </li>

      <li className="lbh-timeline__event lbh-timeline__event--minor">
        <h4 className="lbh-heading-h6">Warning note added by Namey McName</h4>
        <p className="lbh-body-xs">10 August 2019</p>
      </li>

      <li className="lbh-timeline__event lbh-timeline__event--minor">
        <h4 className="lbh-heading-h6">Allocated</h4>
        <p className="lbh-body-xs">10 August 2019</p>
      </li>
    </ul>

    <Link href="#">
      <a className="lbh-link lbh-link--muted">See all</a>
    </Link>
  </aside>
);

export default ActivityTimeline;
