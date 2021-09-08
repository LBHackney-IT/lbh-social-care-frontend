import React from 'react';
import FlexibleAnswers from 'components/FlexibleAnswers/FlexibleAnswers';
import { FlexibleAnswers as FlexibleAnswersT } from 'data/flexibleForms/forms.types';
import { useRouter } from 'next/router';
import { AddCaseStatus } from 'utils/api/caseStatus';
import { useAuth } from 'components/UserContext/UserContext';
import { User } from 'types';
import PersonView from 'components/PersonView/PersonView';
import Button from 'components/Button/Button';
import Link from 'next/link';

const ReviewCaseStatusForm = (): React.ReactElement => {
  const router = useRouter();
  const personId = Number(router.query.id as string);
  const { user } = useAuth() as { user: User };

  const value = router.query;

  const submitAnwers = async () => {
    try {
      const { data, error } = await AddCaseStatus({
        personId: personId,
        type: String(value.type),
        startDate: String(value.startDate),
        notes: String(value.notes),
        createdby: user.email,
      });

      if (error) throw error;

      router.push({
        pathname: `/people/${router.query.id}/details`,
        query: { success: true },
      });

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const displayValue: FlexibleAnswersT = {
    answers: {
      Type: String(value.type),
      'Start date': String(value.startDate),
      Notes: String(value.notes),
    },
  };

  return (
    <PersonView personId={personId} expandView>
      <>
        <FlexibleAnswers answers={displayValue} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button label="Yes, add" onClick={submitAnwers} wideButton />
          <Link
            href={{ pathname: `/people/${router.query.id}/case-status/add` }}
            scroll={false}
          >
            <a className={`lbh-link lbh-link--no-visited-state`}>No, go back</a>
          </Link>
        </div>
      </>
    </PersonView>
  );
};

export default ReviewCaseStatusForm;
