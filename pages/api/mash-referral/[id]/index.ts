import { StatusCodes } from 'http-status-codes';

import { isAuthorised } from 'utils/auth';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import {
  patchReferralFinal,
  patchReferralInitial,
  patchReferralScreening,
  patchReferralContact,
} from 'lib/mashReferral';
import { AxiosError } from 'axios';
import { apiHandler } from 'lib/apiHandler';

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
        const updateTye = req.body.updateType;

        if (updateTye === 'SCREENING-DECISION') {
          const { referralId, decision, requiresUrgentContact, workerEmail } = {
            referralId: Number(req.query.id),
            decision: req.body.decision,
            requiresUrgentContact: req.body.requiresUrgentContact,
            workerEmail: req.body.workerEmail,
          };

          const data = await patchReferralScreening({
            referralId,
            decision,
            requiresUrgentContact,
            updateType: 'SCREENING-DECISION',
            workerEmail,
          });

          res.status(StatusCodes.OK).json(data);
        } else if (updateTye === 'INITIAL-DECISION') {
          const {
            referralId,
            decision,
            requiresUrgentContact,
            workerEmail,
            referralCategory,
          } = {
            referralId: Number(req.query.id),
            decision: req.body.decision,
            requiresUrgentContact: req.body.requiresUrgentContact,
            workerEmail: req.body.workerEmail,
            referralCategory: req.body.referralCategory,
          };

          const data = await patchReferralInitial({
            referralId,
            decision,
            requiresUrgentContact,
            updateType: 'INITIAL-DECISION',
            workerEmail,
            referralCategory,
          });

          res.status(StatusCodes.OK).json(data);
        } else if (updateTye === 'FINAL-DECISION') {
          const {
            referralId,
            decision,
            requiresUrgentContact,
            workerEmail,
            referralCategory,
          } = {
            referralId: Number(req.query.id),
            decision: req.body.decision,
            requiresUrgentContact: req.body.requiresUrgentContact,
            workerEmail: req.body.workerEmail,
            referralCategory: req.body.referralCategory,
          };

          const data = await patchReferralFinal({
            referralId,
            decision,
            requiresUrgentContact,
            updateType: 'FINAL-DECISION',
            workerEmail,
            referralCategory,
          });

          res.status(StatusCodes.OK).json(data);
        } else if (updateTye === 'CONTACT-DECISION') {
          const { referralId, requiresUrgentContact, workerEmail } = {
            referralId: Number(req.query.id),
            requiresUrgentContact: req.body.requiresUrgentContact,
            workerEmail: req.body.workerEmail,
          };
          const data = await patchReferralContact({
            referralId,
            requiresUrgentContact,
            updateType: 'CONTACT-DECISION',
            workerEmail,
          });

          res.status(StatusCodes.OK).json(data);
        }
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        res
          .status(axiosError.response?.status || 500)
          .json(axiosError?.response?.data);
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(endpoint);
