import { NextApiRequest, NextApiResponse } from 'next';
import forms from 'data/flexibleForms/forms';
import { Submission } from 'data/flexibleForms/forms.types';
import { getResident } from 'lib/residents';
import { isAuthorised } from 'utils/auth';
import { getPermissionFlag } from 'utils/user';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id, stepId } = req.query;

  let permissionFlag;
  const user = isAuthorised(req);
  if (user) permissionFlag = getPermissionFlag(user);

  // 1. grab submission
  // TODO: replace with real api call
  const submission: Submission = {
    id: String(id),
    socialCareId: 1,
    formId: 'conversation-3',
    answers: {},
    completedSteps: [],
    editedBy: [],
    createdBy: 'test.user@hackney.gov.uk',
    createdAt: '2021-05-17T10:48:12.880Z',
    updatedAt: '2021-05-17T10:48:12.892Z',
    submittedAt: null,
    discardedAt: null,
  };

  // 2. grab this particular step from the form
  const form = forms.find((form) => form.id === submission.formId);
  const step = form?.steps.find((step) => step.id === stepId);

  if (!step)
    res.status(404).json({
      error: 'Step not found',
    });

  if (req.method === 'PATCH') {
    // TODO: replace with real logic to reconcile the old submission with the new

    res.json({
      ...submission,
    });
  } else {
    // 3. grab person
    const person = await getResident(submission.socialCareId, {
      context_flag: permissionFlag,
    });

    res.json({
      ...submission,
      // include the answers for this step only
      stepAnswers: submission.answers[stepId.toString()],
      form,
      step,
      person,
    });
  }
};

export default handler;
