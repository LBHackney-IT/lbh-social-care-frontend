import forms from 'data/flexibleForms/forms';
import { NextApiRequest, NextApiResponse } from 'next';
import { addCase } from 'lib/cases';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { socialCareId, formId } = req.body;

    // TODO: start a new submission here
    // const newSubmission = await addCase({
    //   socialCareId,
    //   formId,
    // });

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
