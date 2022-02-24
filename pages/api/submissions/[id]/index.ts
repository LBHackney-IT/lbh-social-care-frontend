import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';
import {
  getSubmissionById,
  finishSubmission,
  // patchResidents,
  discardSubmission,
} from 'lib/submissions';
import { isAuthorised } from 'utils/auth';
import { notifyApprover } from 'lib/notify';
import { apiHandler } from 'lib/apiHandler';
import axios from 'axios';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id } = req.query;

  switch (req.method) {
    case 'POST':
      {
        const user = isAuthorised(req);
        const submission = await finishSubmission(
          id as string,
          user?.email ?? ''
        );
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
        const user = isAuthorised(req);
        // TODO: process pinning and unpinning here too
        const { data: submission } = await axios.patch(
          `${process.env.ENDPOINT_API}/submissions/${id}`,
          {
            ...req.body,
            editedBy: user?.email,
            pinnedAt: req.body.pinnedAt || '',
          },
          {
            headers: {
              'x-api-key': process.env.AWS_KEY,
            },
          }
        );

        // const submission = await patchResidents(
        //   id as string,
        //   user?.email ?? '',
        //   req.body.residents
        // );

        res.status(StatusCodes.ACCEPTED).json(submission);
      }
      break;
    case 'DELETE':
      {
        const user = isAuthorised(req);
        const status = await discardSubmission(id as string, user?.email ?? '');

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

export default apiHandler(handler);
