import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';
import { finishSubmission, patchSubmissionForStep } from 'lib/submissions';
import { isAuthorised } from 'utils/auth';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { id } = req.query;

    const user = isAuthorised(req);

    switch (req.method) {
      case 'POST':
        {
          const submission = await finishSubmission(
            String(id),
            String(user?.email),
            { singleStep: req.body }
          );
          res.json(submission);
        }
        break;
      case 'PATCH':
        {
          const submission = await patchSubmissionForStep(
            String(id),
            'singleStep',
            String(user?.email),
            req.body
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
  } catch (e) {
    console.log(e.response.data.errors);
    res.status(e.response.status).json(e.toJSON());
  }
};

export default handler;
