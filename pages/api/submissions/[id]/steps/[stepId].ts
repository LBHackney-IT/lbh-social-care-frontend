import forms from 'data/flexibleForms';
import { isAuthorised } from 'utils/auth';
import { getSubmissionById, patchSubmissionForStep } from 'lib/submissions';
import statusCodes from 'http-status-codes';
import { Submission } from 'data/flexibleForms/forms.types';
import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

const endpoint: AuthenticatedNextApiHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { id, stepId } = req.query;

    let submission: Submission;
    submission = await getSubmissionById(String(id));
    const form = forms.find((form) => form.id === submission.formId);
    const step = form?.steps.find((step) => step.id === stepId);

    if (!step)
      return res.status(statusCodes.NOT_FOUND).json({
        error: 'Step not found',
      });

    if (req.method === 'PATCH') {
      const values = req.body;
      const user = isAuthorised(req);

      submission = await patchSubmissionForStep(
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
  } catch (e) {
    res
      .status((e as AxiosError).response?.status || 500)
      .json((e as AxiosError).toJSON());
  }
};

export default apiHandler(csrfMiddleware(endpoint));
