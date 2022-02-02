import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';
import { panelApproveSubmission } from 'lib/submissions';
import { isAuthorised } from 'utils/auth';
import { apiHandler } from 'lib/apiHandler';

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
    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      break;
  }
};

export default apiHandler(handler);
