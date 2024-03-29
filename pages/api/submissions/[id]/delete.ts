import StatusCodes from 'http-status-codes';
import { deleteSubmission } from 'lib/submissions';
import { AxiosError } from 'axios';
import {
  apiHandler,
  AuthenticatedNextApiHandler,
  handleAxiosError,
} from 'lib/apiHandler';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

const handler: AuthenticatedNextApiHandler = async (
  req,
  res
): Promise<void> => {
  switch (req.method) {
    case 'DELETE':
      {
        const submissionid = req.query.id as string;
        const deletedBy = req.user.email as string;
        const deleteReason = req.query.deleteReason as string;
        const deleteRequestedBy = req.query.deleteRequestedBy as string;

        try {
          await deleteSubmission(
            submissionid,
            deletedBy,
            deleteReason,
            deleteRequestedBy
          );

          res.status(StatusCodes.NO_CONTENT).end();
        } catch (error) {
          console.error(
            'Submission DELETE error:',
            (error as AxiosError)?.response?.data
          );

          res = handleAxiosError(res, error as AxiosError, 'Submission');
        }
      }
      break;
    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      break;
  }
};

export default apiHandler(csrfMiddleware(handler));
