import { Submission } from 'data/flexibleForms/forms.types';
import { mockedResident } from 'factories/residents';
import { mockedUser } from 'factories/users';
import { mockedWorker } from 'factories/workers';

export const mockSubmission: Submission = {
  submissionId: '123',
  formId: 'foo',
  residents: [mockedResident],
  createdBy: mockedUser,
  createdAt: '2021-06-21T12:00:00.000Z',
  workers: [],
  editHistory: [
    {
      worker: mockedWorker,
      editTime: '2021-06-21T12:00:00.000Z',
    },
  ],
  submissionState: 'In progress',
  formAnswers: {},
};
