import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';
import { panelApproveSubmission, returnForEdits } from 'lib/submissions';
import { isAuthorised } from 'utils/auth';
import { notifyReturnedForEdits } from 'lib/notify';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id } = req.query;

  const user = isAuthorised(req);

  switch (req.method) {
    case 'POST':
      {
        const submission = await panelApproveSubmission(
          String(id),
          String(user?.email)
        );
        res.json(submission);
      }
      break;
    case 'DELETE':
      {
        const submission = await returnForEdits(
          String(id),
          String(user?.email),
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

export default handler;
