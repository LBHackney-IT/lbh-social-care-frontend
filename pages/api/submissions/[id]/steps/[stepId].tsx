import { NextApiRequest, NextApiResponse } from 'next';
import forms from 'data/flexibleForms/forms';
import { getResident } from 'lib/residents';
import { isAuthorised } from 'utils/auth';
import { getPermissionFlag } from 'utils/user';
import { getSubmissionById, patchSubmissionForStep } from 'lib/submissions';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id, stepId } = req.query;

  let permissionFlag;
  const user = isAuthorised(req);
  if (user) permissionFlag = getPermissionFlag(user);

  // 1. grab submission
  const submission = await getSubmissionById(String(id));

  // 2. grab this particular step from the form
  const form = forms.find((form) => form.id === submission.formId);
  const step = form?.steps.find((step) => step.id === stepId);

  if (!step)
    res.status(404).json({
      error: 'Step not found',
    });

  if (req.method === 'PATCH') {
    const values = JSON.parse(req.body);
    patchSubmissionForStep(
      String(id),
      String(stepId),
      String(user?.email),
      values
    );

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
