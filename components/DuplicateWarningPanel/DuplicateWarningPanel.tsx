import cx from 'classnames';
import s from 'stylesheets/WarningPanel.module.scss';
import ResidentsTable from 'components/Search/results/ResidentsTable';
import { useResidents } from 'utils/api/residents';
import { LegacyResident } from 'types';

interface Props {
  newResident: Record<string, unknown>;
}

const DuplicateWarningPanel = ({
  newResident,
}: Props): React.ReactElement | null => {
  const { data } = useResidents({
    first_name: newResident.firstName,
    last_name: newResident.lastName,
  });

  const matchingResidents = data?.[0]?.residents as LegacyResident[];

  if (matchingResidents?.length > 0) {
    return (
      <div className={s.mutedPanel}>
        <div
          className={cx('govuk-warning-text lbh-warning-text', s.warningText)}
        >
          <span
            className={cx('govuk-warning-text__icon', s.icon)}
            aria-hidden="true"
          >
            !
          </span>
          <div className={cx('govuk-warning-text__text', s.text)}>
            <h2>This person may be a duplicate</h2>
            <p>
              The details you’ve entered match one or more people. Check that
              the person doesn’t already exist before continuing:
            </p>

            <ResidentsTable records={matchingResidents} newTab={true} />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DuplicateWarningPanel;
