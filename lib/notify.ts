import { NotifyClient } from 'notifications-node-client';
import { Submission } from 'data/flexibleForms/forms.types';

const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY);

/** send an email notification to someone that a submission needs their approval */
export const notifyApprover = async (
  submission: Submission,
  approverEmail: string
): Promise<void> => {
  return await notifyClient.sendEmail(
    process.env.NOTIFY_APPROVER_TEMPLATE_ID,
    approverEmail,
    {
      personalisation: {},
      reference: '',
    }
  );
};

// export const notifyReturnedForEdits = async (
//   submission: Submission,
//   reason?: string
// ): Promise<void> => {
// };
