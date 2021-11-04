import s from './MashHeading.module.scss';

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
        <span className="govuk-!-margin-right-3"> received at {datetime}</span>
        <span className="govuk-tag lbh-tag lbh-tag--green">
          {timeleft} left
        </span>
      </div>
    </div>
  </section>
);

export default MASHheading;
