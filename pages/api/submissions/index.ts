import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';
import { startSubmission, getInProgressSubmissions } from 'lib/submissions';
import { isAuthorised } from 'utils/auth';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
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
        const submissions = await getInProgressSubmissions(
          user?.permissionFlag
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

export default handler;
