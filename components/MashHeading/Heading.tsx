import s from './MashHeading.module.scss';
import { format } from 'date-fns';
import MashTag from 'components/MashTags/MashTags';

interface Props {
  clientname: string;
  datetime: string;
  filter: string;
}

const MASHheading = ({
  clientname,
  datetime,
  filter,
}: Props): React.ReactElement => (
  <section className="govuk-!-margin-bottom-8">
    <div className={s.banner}>
      <div className={s.heading}>{clientname}</div>
      <div>
        <span className="govuk-!-margin-right-3">
          {' '}
          received at {format(new Date(datetime), 'HH:00 dd MMM')}
        </span>
        <MashTag filter={filter} />
      </div>
    </div>
  </section>
);

export default MASHheading;
