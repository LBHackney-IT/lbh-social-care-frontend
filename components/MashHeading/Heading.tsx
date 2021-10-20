import s from './MashHeading.module.scss';

interface Props {
  clientname: string;
  timeleft: string;
}

const MASHheading = ({ clientname, timeleft }: Props): React.ReactElement => (
  <>
    <section className="govuk-!-margin-bottom-8">
      <div className={s.greenheading}>
        <h2>{clientname}</h2>
        <div>
          <span className="govuk-!-margin-right-3">
            {' '}
            recieved at 10:00 6 Jun
          </span>
          <span className="govuk-tag lbh-tag lbh-tag--green">
            {timeleft} left
          </span>
        </div>
      </div>
    </section>
  </>
);

export default MASHheading;
