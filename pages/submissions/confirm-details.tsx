import { GetServerSideProps } from 'next';
import { getResident } from 'lib/residents';
import { Resident, User } from 'types';
import { isAuthorised } from 'utils/auth';
import cx from 'classnames';
import s from 'stylesheets/WarningPanel.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PersonDetails from 'components/PersonView/PersonDetails';

interface Props {
  resident: Resident;
}

const ConfirmDetailsPage = ({ resident }: Props): React.ReactElement => {
  const { query } = useRouter();

  return (
    <div className={s.mutedPanel}>
      <div className={cx('govuk-warning-text lbh-warning-text', s.warningText)}>
        <span
          className={cx('govuk-warning-text__icon', s.icon)}
          aria-hidden="true"
        >
          !
        </span>
        <div className={cx('govuk-warning-text__text', s.text)}>
          <h2>Are their personal details still correct?</h2>
          <p>You need to confirm these before continuing:</p>

          <PersonDetails person={resident} summarised />

          <div className={s.twoActions}>
            <Link
              href={`/submissions/new?form_id=${query.form_id}&social_care_id=${query.social_care_id}`}
            >
              <a className="govuk-button lbh-button">Yes, they are correct</a>
            </Link>
            <Link href={`/people/${query.social_care_id}/edit`}>
              <a className="lbh-link lbh-link--no-visited-state">No, amend</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmDetailsPage.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { social_care_id } = query;

  const user = isAuthorised(req);
  const resident = await getResident(Number(social_care_id), user as User);

  return {
    props: {
      resident,
    },
  };
};

export default ConfirmDetailsPage;
