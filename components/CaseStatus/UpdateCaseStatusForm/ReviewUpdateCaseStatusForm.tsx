import FlexibleAnswers from 'components/FlexibleAnswers/FlexibleAnswers';
import Button from 'components/Button/Button';
import Link from 'next/link';
import Banner from 'components/FlexibleForms/Banner';
import { FlexibleAnswers as FlexibleAnswersT } from 'data/flexibleForms/forms.types';
import { useState } from 'react';
import { updateCaseStatus } from 'utils/api/caseStatus';
import { useAuth } from 'components/UserContext/UserContext';
import { useRouter } from 'next/router';
import {
  CaseStatusMapping,
  LACLegalStatusOptions,
  LACPlacementTypeOptions,
  User,
  UpdateLACCaseStatusFormData,
} from 'types';

const ReviewAddCaseStatusForm: React.FC<{
  title: string;
  personId: number;
  caseStatusId: number;
  caseStatusType: string;
  formAnswers: any;
  action: string;
}> = ({
  title,
  personId,
  caseStatusId,
  caseStatusType,
  action,
  formAnswers,
}) => {
  const router = useRouter();
  const [status, setStatus] = useState('');
  const { user } = useAuth() as { user: User };

  const submitAnswers = async () => {
    try {
      const postObject: UpdateLACCaseStatusFormData = {
        caseStatusID: caseStatusId,
        startDate: formAnswers.startDate,
        answers: [
          {
            option: 'placementType',
            value: formAnswers.placementType,
          },
          {
            option: 'legalStatus',
            value: formAnswers.legalStatus,
          },
        ],
        createdBy: user.email,
      };
      const { error } = await updateCaseStatus(postObject, caseStatusId);
      if (error) throw error;

      router.push({
        pathname: `/people/${personId}/details`,
        query: {
          flaggedStatus: true,
          message:
            action == 'edit' ? 'Flagged status edited' : 'Flagged status ended',
        },
      });
    } catch (e) {
      setStatus(`Error ${e.response.data.status}: ${e.response.data.message}`);
    }
  };

  const typeString =
    CaseStatusMapping[caseStatusType as keyof typeof CaseStatusMapping];

  const answers = {
    'Case status': typeString,
    'Date the changes will take effect': formAnswers.startDate
      ? new Date(formAnswers.startDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : '',
    'New legal status':
      LACLegalStatusOptions[
        formAnswers.legalStatus as keyof typeof LACLegalStatusOptions
      ],
    'New placement type':
      LACPlacementTypeOptions[
        formAnswers.placementType as keyof typeof LACPlacementTypeOptions
      ],
    Notes: formAnswers.notes,
  };

  const displayValue: FlexibleAnswersT = {
    answers: answers,
  };

  return (
    <>
      {status && (
        <Banner
          title="There was a problem editing the case status"
          className="lbh-page-announcement--warning"
        >
          <p>Please refresh the page or try again later.</p>
          <p className="lbh-body-xs">{status}</p>
        </Banner>
      )}
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">{title}</h1>

      <FlexibleAnswers answers={displayValue} />

      <div>
        <p className="lbh-body">Do you want to {action} this case status?</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button label={`Yes, ${action}`} onClick={submitAnswers} wideButton />
          <Link
            href={{
              pathname: `/people/${personId}/case-status/${caseStatusId}/update/edit`,
              query: {
                prefilledFields: JSON.stringify(formAnswers),
                type: caseStatusType,
              },
            }}
            scroll={false}
          >
            <a
              className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-5`}
            >
              No, cancel
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ReviewAddCaseStatusForm;
