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
  } = useCasesByResident(personId);
  const { data: submissionsData } = useUnfinishedSubmissions(personId);

  // flatten pagination
  const events = casesData?.reduce(
    (acc, page) => acc.concat(page.cases as Case[]),
    [] as Case[]
  );

  const onLastPage = !casesData?.[casesData.length - 1].nextCursor;

  return events ? (
    events.length > 0 ? (
      <>
        <PersonTimeline
          unfinishedSubmissions={submissionsData || { items: [], count: 0 }}
          events={events}
          size={size}
          setSize={setSize}
          onLastPage={onLastPage}
        />
      </>
    ) : (
      <p>No events to show</p>
    )
  ) : casesError ? (
    <ErrorMessage label={casesError.message} />
  ) : (
    <Spinner />
  );
};

export default PersonHistory;
