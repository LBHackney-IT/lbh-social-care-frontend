import s from './MashHeading.module.scss';
import { format } from 'date-fns';

interface Props {
  clientname: string;
  timeleft: string;
  datetime: string;
}

const MASHheading = ({
  clientname,
  timeleft,
  datetime,
}: Props): React.ReactElement => (
  <section className="govuk-!-margin-bottom-8">
    <div className={s.banner}>
      <div className={s.heading}>{clientname}</div>
      <div>
        <span className="govuk-!-margin-right-3">
          {' '}
          received at {format(new Date(datetime), 'HH:00 dd MMM')}
        </span>
        <span className="govuk-tag lbh-tag lbh-tag--green">{timeleft}</span>
      </div>
    </div>
  </section>
);

export default MASHheading;
