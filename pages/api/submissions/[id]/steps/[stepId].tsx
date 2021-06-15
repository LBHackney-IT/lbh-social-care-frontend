import { NextApiRequest, NextApiResponse } from 'next';
import forms from 'data/flexibleForms';
import { isAuthorised } from 'utils/auth';
import { getSubmissionById, patchSubmissionForStep } from 'lib/submissions';
import statusCodes from 'http-status-codes';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id, stepId } = req.query;

  const user = isAuthorised(req);

  // 1. grab submission
  const submission = await getSubmissionById(String(id));

  // 2. grab this particular step from the form
  const form = forms.find((form) => form.id === submission.formId);
  const step = form?.steps.find((step) => step.id === stepId);

  if (!step)
    res.status(statusCodes.NOT_FOUND).json({
      error: 'Step not found',
    });

  if (req.method === 'PATCH') {
    const values = req.body;
    patchSubmissionForStep(
      String(id),
      String(stepId),
      String(user?.email),
      values
    );
    res.json(submission);
  } else {
    res.json({
      ...submission,
      // include the answers for this step only
      stepAnswers: submission.formAnswers[stepId.toString()],
      form,
      step,
    });
  }
};

export default handler;
