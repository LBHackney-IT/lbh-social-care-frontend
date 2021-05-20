import forms from 'data/flexibleForms/forms';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    // TODO: start a new submission here
    // TODO: send back new case object
    res.json({
      id: 1,
    });
  } else {
    res.json({
      forms,
    });
  }
};

export default handler;
