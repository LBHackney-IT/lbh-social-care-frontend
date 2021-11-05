import { StatusCodes } from 'http-status-codes';

import { isAuthorised } from 'utils/auth';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { patchReferral } from 'lib/mashReferral';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
  if (!user.isAuthorised) {
    return res.status(StatusCodes.FORBIDDEN).end();
  }
  switch (req.method) {
    case 'PATCH':
      try {
        const { referralId, decision, requiresUrgentContact, workerEmail } = {
          referralId: req.query.id as string,
          decision: req.body.decision,
          requiresUrgentContact: req.body.requiresUrgentContact,
          workerEmail: req.body.workerEmail,
        };

        const data = await patchReferral({
          referralId,
          decision,
          requiresUrgentContact,
          updateType: 'SCREENING-DECISION',
          workerEmail,
        });
        res.status(StatusCodes.OK).json(data);
      } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default endpoint;
