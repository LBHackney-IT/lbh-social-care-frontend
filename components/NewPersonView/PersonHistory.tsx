import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import React, { useState } from 'react';
import { Case } from 'types';
import { useCasesByResident } from 'utils/api/cases';
import PersonTimeline from './PersonTimeline';
import { isAdminOrDev } from 'lib/permissions';
import { User } from 'types';
import { useAuth } from 'components/UserContext/UserContext';

interface Props {
  personId: number;
}

const PersonHistory = ({ personId }: Props): React.ReactElement => {
  const [displayDeletedCases, setDisplayDeletedCases] =
    useState<boolean>(false);
  const { user } = useAuth() as { user: User };
  const includeDeletedCount = isAdminOrDev(user);

  const {
    data: casesData,
    size,
    setSize,
    error: casesError,
    isValidating,
  } = useCasesByResident(personId, {
    includeDeletedRecords: displayDeletedCases,
    includeDeletedRecordsCount: includeDeletedCount,
  });

  if (isValidating && casesData === undefined) {
    return <Spinner />;
  }

  if (casesError) {
    return <ErrorMessage label={casesError.message} />;
  }

  let deletedCount = 0;

  const events = [] as Case[];
  for (let i = 0; casesData !== undefined && i < casesData.length; i++) {
    events.push(...casesData[i].cases);
    if (includeDeletedCount) {
      deletedCount = casesData[i].deletedCount
        ? Number(casesData[i].deletedCount)
        : 0;
    }
  }

  if (!events || events.length === 0) {
    return <p>No events to show</p>;
  }

  const onLastPage = !casesData?.[casesData.length - 1].nextCursor;

  return (
    <PersonTimeline
      personId={personId}
      events={events}
      size={size}
      setSize={setSize}
      onLastPage={onLastPage}
      displayDeletedCases={displayDeletedCases}
      setDisplayDeletedCases={setDisplayDeletedCases}
      deletedRecordsCount={deletedCount}
    />
  );
};

export default PersonHistory;
