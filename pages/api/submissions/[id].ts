// import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import forms from '../../../data/flexibleForms/forms';
import { getResident } from '../../../lib/residents';
import { isAuthorised } from 'utils/auth';

// import { apiHandler, ApiRequesWithSession } from '../../../../lib/apiHelpers';

const handler = async (req: ApiRequestWithSession, res: NextApiResponse) => {
  const user = isAuthorised(req);

  const { id } = req.query;

  const submission = {
    id: id,
    socialCareId: 1,
    formId: 'conversation-3',
    answers: {},
    completedSteps: [],
    editedBy: [],
    createdBy: 'test.user@hackney.gov.uk',
    createdAt: '2021-05-17T10:48:12.880Z',
    updatedAt: '2021-05-17T10:48:12.892Z',
    submittedAt: null,
    discardedAt: null,
  };

  const person = await getResident(submission.socialCareId, {
    context_flag: 'A',
  });

  // 3. grab form
  const form = forms.find((form) => form.id === submission.formId);

  res.json({
    ...submission,
    person,
    form,
  });
};

export default handler;
