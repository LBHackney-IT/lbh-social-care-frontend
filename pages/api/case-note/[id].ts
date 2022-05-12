import StatusCodes from 'http-status-codes';
import { finishSubmission, patchSubmissionForStep } from 'lib/submissions';
import { FormikValues } from 'formik';
import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

const handler: AuthenticatedNextApiHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { id } = req.query;

    switch (req.method) {
      case 'POST':
        {
          const values = req.body as FormikValues;
          const submission = await finishSubmission(
            String(id),
            String(req.user.email),
            { singleStep: values }
          );
          res.json(submission);
        }
        break;
      case 'PATCH':
        {
          const { values, dateOfEventId, titleId } = req.body as {
            values: FormikValues;
            dateOfEventId?: string;
            titleId?: string;
          };

          const submission = await patchSubmissionForStep(
            String(id),
            'singleStep',
            String(req.user.email),
            values,
            dateOfEventId,
            titleId
          );
          res.json(submission);
        }
        break;
      default:
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Invalid request method' });
        break;
    }
  } catch (e) {
    console.log((e as AxiosError).response?.data.errors);
    res
      .status(
        (e as AxiosError).response?.status || StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json((e as AxiosError).toJSON());
  }
};

export default apiHandler(csrfMiddleware(handler));
