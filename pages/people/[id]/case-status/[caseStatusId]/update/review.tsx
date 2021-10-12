import React from 'react';
import ReviewUpdateCaseStatusForm from 'components/CaseStatus/UpdateCaseStatusForm/ReviewUpdateCaseStatusForm';
import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';

const ReviewCaseStatusForm = (): React.ReactElement => {
  const router = useRouter();

  const personId = Number(router.query.id as string);
  const caseStatusId = Number(router.query.caseStatusId as string);
  const type = router.query.type as string;
  const formAnswers = router.query;
  const action = String(router.query.action);

  return (
    <PersonView personId={personId} expandView>
      <ReviewUpdateCaseStatusForm
        title={`Review ${router.query.action} case status details`}
        personId={personId}
        caseStatusId={caseStatusId}
        caseStatusType={type}
        action={action}
        formAnswers={formAnswers}
      />
    </PersonView>
  );
};
ReviewCaseStatusForm.goBackButton = true;

export default ReviewCaseStatusForm;
