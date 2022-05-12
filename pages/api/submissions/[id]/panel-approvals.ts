import StatusCodes from 'http-status-codes';
import { panelApproveSubmission } from 'lib/submissions';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

const handler: AuthenticatedNextApiHandler = async (
  req,
  res
): Promise<void> => {
  const { id } = req.query;

  switch (req.method) {
    case 'POST':
      {
        const submission = await panelApproveSubmission(
          String(id),
          String(req.user.email)
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
};

export default apiHandler(csrfMiddleware(handler));
