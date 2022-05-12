import StatusCodes from 'http-status-codes';
import { startSubmission, getInProgressSubmissions } from 'lib/submissions';
import { isAuthorised } from 'utils/auth';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

const handler: AuthenticatedNextApiHandler = async (
  req,
  res
): Promise<void> => {
  const user = isAuthorised(req);
  switch (req.method) {
    case 'POST':
      {
        const { formId, socialCareId } = req.body;
        const submission = await startSubmission(
          formId,
          socialCareId,
          String(user?.email)
        );
        res.json(submission);
      }
      break;
    case 'GET':
      {
        const { personID, page, size } = req.query;

        const submissions = await getInProgressSubmissions(
          user?.permissionFlag,
          Number(personID),
          undefined,
          Number(page),
          Number(size)
        );
        res.json(submissions);
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
