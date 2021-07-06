import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';
import { approveSubmission, returnForEdits } from 'lib/submissions';
import { isAuthorised } from 'utils/auth';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id } = req.query;

  const user = isAuthorised(req);

  switch (req.method) {
    case 'POST':
      {
        const status = await approveSubmission(String(id), String(user?.email));
        res.status(status).end();
      }
      break;
    case 'DELETE':
      {
        const status = await returnForEdits(String(id), String(user?.email));
        res.status(status).end();
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
