import { useState, useEffect } from 'react';
import cx from 'classnames';
import s from './DuplicateWarningPanel.module.scss';
import { LegacyResident } from 'types';
import axios from 'axios';
import ResidentsTable from 'components/Search/results/ResidentsTable';

interface Props {
  newResident: Record<string, unknown>;
}

const DuplicateWarningPanel = ({
  newResident,
}: Props): React.ReactElement | null => {
  const [matchingResidents, setMatchingResidents] = useState<LegacyResident[]>(
    []
  );

  useEffect(() => {
    axios
      .get(`/api/residents`, {
        headers: { 'x-api-key': process.env.AWS_KEY },
        params: {
          first_name: newResident.firstName,
          last_name: newResident.lastName,
        },
      })
      .then(({ data }) => setMatchingResidents(data.residents));
  }, [newResident]);

  console.log(matchingResidents);

  if (matchingResidents?.length > 0)
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

            <ResidentsTable records={matchingResidents} />
          </div>
        </div>
      </div>
    );

  return null;
};

export default DuplicateWarningPanel;
