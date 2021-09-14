import React from 'react';
import ReviewAddCaseStatusForm from 'components/CaseStatus/AddCaseStatusForm/ReviewAddCaseStatusForm';
import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';

const ReviewCaseStatusForm = (): React.ReactElement => {
  const router = useRouter();

  const personId = Number(router.query.id as string);
  const formAnswers = router.query;

  return (
    <PersonView personId={personId} expandView>
      <ReviewAddCaseStatusForm
        title="Review case status details"
        personId={personId}
        formAnswers={formAnswers}
      />
    </PersonView>
  );
};
ReviewCaseStatusForm.goBackButton = true;

export default ReviewCaseStatusForm;
