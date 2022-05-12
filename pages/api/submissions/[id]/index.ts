import StatusCodes from 'http-status-codes';
import {
  getSubmissionById,
  finishSubmission,
  discardSubmission,
} from 'lib/submissions';
import { notifyApprover } from 'lib/notify';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import axios from 'axios';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

const handler: AuthenticatedNextApiHandler = async (
  req,
  res
): Promise<void> => {
  const { id } = req.query;

  switch (req.method) {
    case 'POST':
      {
        const submission = await finishSubmission(id as string, req.user.email);
        if (req.body.approverEmail)
          await notifyApprover(
            submission,
            req.body.approverEmail,
            req.headers.host ?? ''
          );
        res.status(StatusCodes.CREATED).json(submission);
      }
      break;
    case 'PATCH':
      {
        // TODO: process pinning and unpinning here too
        const { data: submission } = await axios.patch(
          `${process.env.ENDPOINT_API}/submissions/${id}`,
          {
            ...req.body,
            editedBy: req.user.email,
            pinnedAt: req.body.pinnedAt || '',
          },
          {
            headers: {
              'x-api-key': process.env.AWS_KEY,
            },
          }
        );

        res.status(StatusCodes.ACCEPTED).json(submission);
      }
      break;
    case 'DELETE':
      {
        const status = await discardSubmission(id as string, req.user.email);

        res.status(status).end();
      }
      break;
    case 'GET':
      {
        const submission = await getSubmissionById(id as string);

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
