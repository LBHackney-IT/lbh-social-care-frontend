import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import React from 'react';
import { Case } from 'types';
import { useCasesByResident } from 'utils/api/cases';
import { useUnfinishedSubmissions } from 'utils/api/submissions';
import PersonTimeline from './PersonTimeline';

interface Props {
  personId: number;
}

const PersonHistory = ({ personId }: Props): React.ReactElement => {
  const {
    data: casesData,
    size,
    setSize,
    error: casesError,
    isValidating,
  } = useCasesByResident(personId);
  const { data: submissionsData } = useUnfinishedSubmissions(personId);

  const events = [] as Case[];
  for (let i = 0; casesData !== undefined && i < casesData.length; i++) {
    events.push(...casesData[i].cases);
  }

  const onLastPage = !casesData?.[casesData.length - 1].nextCursor;

  if (isValidating && casesData === undefined) {
    return <Spinner />;
  }

  if (casesError) {
    return <ErrorMessage label={casesError.message} />;
  }

  if (!events || events.length === 0) {
    return <p>No events to show</p>;
  }

  return (
    <PersonTimeline
      unfinishedSubmissions={submissionsData || { items: [], count: 0 }}
      events={events}
      size={size}
      setSize={setSize}
      onLastPage={onLastPage}
    />
  );
};

export default PersonHistory;
