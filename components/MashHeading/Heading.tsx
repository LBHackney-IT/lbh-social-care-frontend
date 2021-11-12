import s from './MashHeading.module.scss';
import { format } from 'date-fns';
import MashTag from 'components/MashTags/MashTags';

interface Props {
  clientname: string;
  createdAt: string;
  filter: string;
  initialDecision: string | undefined;
}

const MASHheading = ({
  clientname,
  createdAt,
  filter,
  initialDecision,
}: Props): React.ReactElement => (
  <section className="govuk-!-margin-bottom-8">
    <div className={s.banner}>
      <div className={s.heading}>{clientname}</div>
      <div>
        <span className="govuk-!-margin-right-3">
          {' '}
          received at {format(new Date(createdAt), 'HH:00 dd MMM')}
        </span>
        <MashTag
          initialDecision={initialDecision}
          createdAt={createdAt}
          filter={filter}
        />
      </div>
    </div>
  </section>
);

export default MASHheading;
