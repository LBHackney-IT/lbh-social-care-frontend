import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import React, { useState } from 'react';
import { Case } from 'types';
import { useCasesByResident } from 'utils/api/cases';
import PersonTimeline from './PersonTimeline';

interface Props {
  personId: number;
}

const PersonHistory = ({ personId }: Props): React.ReactElement => {
  const [displayDeletedCases, setDisplayDeletedCases] =
    useState<boolean>(false);

  const {
    data: casesData,
    size,
    setSize,
    error: casesError,
    isValidating,
  } = useCasesByResident(personId, {
    show_deleted_records: displayDeletedCases,
  });

  console.log(casesData);

  if (isValidating && casesData === undefined) {
    return <Spinner />;
  }

  if (casesError) {
    return <ErrorMessage label={casesError.message} />;
  }

  const events = [] as Case[];
  for (let i = 0; casesData !== undefined && i < casesData.length; i++) {
    events.push(...casesData[i].cases);
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
    />
  );
};

export default PersonHistory;
