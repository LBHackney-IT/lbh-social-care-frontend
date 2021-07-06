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

  const submission = await getSubmissionById(String(id));
  const form = forms.find((form) => form.id === submission.formId);
  const step = form?.steps.find((step) => step.id === stepId);

  if (!step)
    return res.status(statusCodes.NOT_FOUND).json({
      error: 'Step not found',
    });

  if (req.method === 'PATCH') {
    const values = req.body;
    const user = isAuthorised(req);

    patchSubmissionForStep(
      String(id),
      String(stepId),
      String(user?.email),
      values
    );

    return res.json(submission);
  } else {
    return res.json({
      ...submission,
      // include the answers for this step only
      stepAnswers: submission.formAnswers[stepId.toString()],
      form,
      step,
    });
  }
};

export default handler;
