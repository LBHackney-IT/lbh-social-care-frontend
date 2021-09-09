import React from 'react';
import FlexibleAnswers from 'components/FlexibleAnswers/FlexibleAnswers';
import { FlexibleAnswers as FlexibleAnswersT } from 'data/flexibleForms/forms.types';
import { useRouter } from 'next/router';
import { addCaseStatus } from 'utils/api/caseStatus';
import { useAuth } from 'components/UserContext/UserContext';
import { User, CaseStatusMapping } from 'types';
import PersonView from 'components/PersonView/PersonView';
import Button from 'components/Button/Button';
import Link from 'next/link';

const ReviewCaseStatusForm = (): React.ReactElement => {
  const router = useRouter();
  const personId = Number(router.query.id as string);
  const { user } = useAuth() as { user: User };
  const formAnswers = router.query;
  const valueMapping = new CaseStatusMapping();

  const submitAnwers = async () => {
    try {
      const { error } = await addCaseStatus({
        personId: personId,
        type: String(formAnswers.type),
        startDate: String(formAnswers.startDate),
        notes: String(formAnswers.notes),
        createdby: user.email,
      });

      if (error) throw error;
      router.push({
        pathname: `/people/${router.query.id}/details`,
        query: { flagged: true },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const displayValue: FlexibleAnswersT = {
    answers: {
      Type: [valueMapping[formAnswers.type as keyof CaseStatusMapping]],
      'Start date': String(formAnswers.startDate),
      Notes: String(formAnswers.notes),
    },
  };

  return (
    <PersonView personId={personId} expandView>
      <>
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
          Review case status details
        </h1>

        <FlexibleAnswers answers={displayValue} />

        <div>
          Do you want to add this case status?
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button label="Yes, add" onClick={submitAnwers} wideButton />
            <Link
              href={{
                pathname: `/people/${router.query.id}/case-status/add`,
                query: router.query,
              }}
              scroll={false}
            >
              <a
                className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-5`}
              >
                No, go back
              </a>
            </Link>
          </div>
        </div>
      </>
    </PersonView>
  );
};
ReviewCaseStatusForm.goBackButton = true;

export default ReviewCaseStatusForm;
