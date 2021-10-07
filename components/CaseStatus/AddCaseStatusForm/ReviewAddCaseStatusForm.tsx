import FlexibleAnswers from 'components/FlexibleAnswers/FlexibleAnswers';
import Button from 'components/Button/Button';
import Link from 'next/link';
import Banner from 'components/FlexibleForms/Banner';
import {
  User,
  CaseStatusMapping,
  ChildProtectionCategoryOptions,
  LACLegalStatusOptions,
  LACPlacementTypeOptions,
  CaseStatusFormValue,
  AddCaseStatusFormData,
} from 'types';
import { FlexibleAnswers as FlexibleAnswersT } from 'data/flexibleForms/forms.types';
import { useState } from 'react';
import { addCaseStatus } from 'utils/api/caseStatus';
import { useAuth } from 'components/UserContext/UserContext';
import { useRouter } from 'next/router';

const ReviewAddCaseStatusForm: React.FC<{
  title: string;
  personId: number;
  formAnswers: any;
}> = ({ title, personId, formAnswers }) => {
  const router = useRouter();
  const [status, setStatus] = useState('');
  const { user } = useAuth() as { user: User };

  const submitAnswers = async () => {
    try {
      const postObject: AddCaseStatusFormData = {
        personId: personId,
        type: String(formAnswers.type),
        startDate: String(formAnswers.startDate),
        fields: [],
        createdby: user.email,
      };

      const fieldsValues: CaseStatusFormValue[] = [];

      formAnswers.notes ? (postObject['notes'] = formAnswers.notes) : null;

      formAnswers.category
        ? fieldsValues.push({
            name: 'category',
            selected: formAnswers.category,
          } as CaseStatusFormValue)
        : null;

      formAnswers.legalStatus
        ? fieldsValues.push({
            name: 'legalStatus',
            selected: formAnswers.legalStatus,
          } as CaseStatusFormValue)
        : null;

      formAnswers.placementType
        ? fieldsValues.push({
            name: 'placementType',
            selected: formAnswers.placementType,
          } as CaseStatusFormValue)
        : null;

      if (fieldsValues.length > 0) {
        postObject['fields'] = fieldsValues;
      }

      const { error } = await addCaseStatus(postObject);

      if (error) throw error;

      router.push({
        pathname: `/people/${personId}/details`,
        query: { flaggedStatus: true },
      });
    } catch (e) {
      setStatus(e.message);
    }
  };

  const displayObj: any = {
    'Case status':
      CaseStatusMapping[formAnswers.type as keyof typeof CaseStatusMapping],
    'Start date': new Date(formAnswers.startDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  };

  if (formAnswers.type === 'CIN') {
    displayObj['Notes'] = String(formAnswers.notes);
  }

  if (formAnswers.type === 'CP') {
    displayObj['Category of child protection plan'] =
      ChildProtectionCategoryOptions[
        formAnswers.category as keyof typeof ChildProtectionCategoryOptions
      ];
  }

  if (formAnswers.type === 'LAC') {
    displayObj['Legal Status'] =
      LACLegalStatusOptions[
        formAnswers.legalStatus as keyof typeof LACLegalStatusOptions
      ];

    displayObj['Placement Type'] =
      LACPlacementTypeOptions[
        formAnswers.placementType as keyof typeof LACPlacementTypeOptions
      ];
  }

  const displayValue: FlexibleAnswersT = {
    answers: displayObj,
  };

  return (
    <>
      {status && (
        <Banner
          title="There was a problem adding a case status"
          className="lbh-page-announcement--warning"
        >
          <p>Please refresh the page or try again later.</p>
          <p className="lbh-body-xs">{status}</p>
        </Banner>
      )}
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">{title}</h1>

      <FlexibleAnswers answers={displayValue} />

      <div>
        <p className="lbh-body">Do you want to add this case status?</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            label="Yes, add this status"
            onClick={submitAnswers}
            wideButton
          />
          <Link
            href={{
              pathname: `/people/${personId}/case-status/add`,
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
