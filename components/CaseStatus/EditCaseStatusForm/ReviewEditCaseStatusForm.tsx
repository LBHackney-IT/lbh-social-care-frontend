import FlexibleAnswers from 'components/FlexibleAnswers/FlexibleAnswers';
import Button from 'components/Button/Button';
import Link from 'next/link';
import Banner from 'components/FlexibleForms/Banner';
import { User } from 'types';
import { FlexibleAnswers as FlexibleAnswersT } from 'data/flexibleForms/forms.types';
import { useState } from 'react';
import { patchCaseStatus } from 'utils/api/caseStatus';
import { useAuth } from 'components/UserContext/UserContext';
import { useRouter } from 'next/router';

const ReviewAddCaseStatusForm: React.FC<{
  title: string;
  personId: number;
  caseStatusId: number;
  formAnswers: any;
  action: string;
}> = ({ title, personId, caseStatusId, action, formAnswers }) => {
  const router = useRouter();
  const [status, setStatus] = useState('');
  const { user } = useAuth() as { user: User };

  const submitAnswers = async () => {
    try {
      const patchObject =
        action == 'edit'
          ? {
              personId: personId,
              startDate: String(formAnswers.startDate),
              notes: String(formAnswers.notes),
              editedBy: user.email,
            }
          : {
              personId: personId,
              endDate: String(formAnswers.endDate),
              editedBy: user.email,
            };

      const { error } = await patchCaseStatus(patchObject);

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
      setStatus(e.message);
    }
  };

  const displayValue: FlexibleAnswersT =
    action == 'edit'
      ? {
          answers: {
            'Start date': new Date(formAnswers.startDate).toLocaleDateString(
              'en-GB',
              {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }
            ),
            Notes: String(formAnswers.notes),
          },
        }
      : {
          answers: {
            'End date': new Date(formAnswers.endDate).toLocaleDateString(
              'en-GB',
              {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }
            ),
          },
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
              pathname: `/people/${personId}/case-status/${caseStatusId}/edit/edit`,
              query: { prefilledFields: JSON.stringify(formAnswers) },
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
