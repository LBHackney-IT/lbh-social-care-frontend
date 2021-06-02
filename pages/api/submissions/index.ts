import forms from 'data/flexibleForms/forms';
import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';
import { startSubmission } from 'lib/submissions';
import { isAuthorised } from 'utils/auth';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      {
        const { formId, socialCareId } = JSON.parse(req.body);
        const user = isAuthorised(req);

        const submission = await startSubmission(
          formId,
          socialCareId,
          user?.email as string
        );

        res.json(submission);
      }
      break;
    case 'GET':
      {
        res.json({
          forms,
        });
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
