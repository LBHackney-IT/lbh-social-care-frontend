import { NotifyClient } from 'notifications-node-client';
import { Submission } from 'data/flexibleForms/forms.types';
import forms from 'data/flexibleForms';

/** send an email notification to someone that a submission needs their approval */
export const notifyApprover = async (
  submission: Submission,
  approverEmail: string
): Promise<void> => {
  const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY);

  return await notifyClient.sendEmail(
    process.env.NOTIFY_APPROVER_TEMPLATE_ID,
    approverEmail,
    {
      personalisation: {
        url: `/people/${submission.residents[0].id}/submissions/${submission.submissionId}`,
        form_name: forms.find((form) => form.id === submission.formId)?.name,
        resident_name: submission.residents
          .map((res) => `${res.firstName} ${res.lastName}`)
          .join(', '),
        started_by: submission.createdBy.email,
      },
      reference: `${submission.submissionId}-${approverEmail}`,
    }
  );
};

/** send an email notification to a creator that their submission has been rejected */
export const notifyReturnedForEdits = async (
  submission: Submission,
  rejecterEmail: string,
  reason?: string
): Promise<void> => {
  const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY);

  return await notifyClient.sendEmail(
    process.env.NOTIFY_RETURN_FOR_EDITS_TEMPLATE_ID,
    submission.createdBy.email,
    {
      personalisation: {
        url: `/submissions/${submission.submissionId}`,
        form_name: forms.find((form) => form.id === submission.formId)?.name,
        resident_name: submission.residents
          .map((res) => `${res.firstName} ${res.lastName}`)
          .join(', '),
        started_by: submission.createdBy.email,
        rejecter_email: rejecterEmail,
        reason,
      },
      reference: `${submission.submissionId}-${rejecterEmail}`,
    }
  );
};
