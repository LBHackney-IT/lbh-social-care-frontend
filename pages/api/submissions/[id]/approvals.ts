import StatusCodes from 'http-status-codes';
import { approveSubmission, returnForEdits } from 'lib/submissions';
import { notifyReturnedForEdits } from 'lib/notify';
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
        const submission = await approveSubmission(
          String(id),
          String(req.user.email)
        );
        res.json(submission);
      }
      break;
    case 'DELETE':
      {
        const submission = await returnForEdits(
          String(id),
          String(req.user.email),
          req.body.rejectionReason
        );
        // send an email notification to the creator
        await notifyReturnedForEdits(
          submission,
          String(req.user.email),
          String(req.headers.host),
          req.body.rejectionReason
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
