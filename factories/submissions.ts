import {
  InProgressSubmission,
  Submission,
  SubmissionState,
} from 'data/flexibleForms/forms.types';
import { mockedResident } from 'factories/residents';
import { mockedWorker } from 'factories/workers';

export const mockSubmission: Submission = {
  submissionId: '123',
  formId: 'foo',
  residents: [mockedResident],
  createdBy: mockedWorker,
  createdAt: '2021-06-21T12:00:00.000Z',
  submittedBy: mockedWorker,
  submittedAt: '2021-07-21T12:00:00.000Z',
  approvedBy: null,
  approvedAt: null,
  panelApprovedBy: null,
  panelApprovedAt: null,
  workers: [mockedWorker],
  editHistory: [
    {
      worker: mockedWorker,
      editTime: '2021-06-21T12:00:00.000Z',
    },
  ],
  submissionState: SubmissionState.InProgress,
  formAnswers: {},
  lastEdited: '2021-06-21T12:00:00.000Z',
  completedSteps: 0,
};

export const mockInProgressSubmission: InProgressSubmission = {
  submissionId: '123',
  formId: 'foo',
  residents: [mockedResident],
  createdBy: mockedWorker,
  createdAt: '2021-06-21T12:00:00.000Z',
  approvedBy: null,
  approvedAt: null,
  panelApprovedBy: null,
  panelApprovedAt: null,
  workers: [mockedWorker],
  submissionState: SubmissionState.InProgress,
  lastEdited: '2021-06-21T12:00:00.000Z',
  completedSteps: 1,
};
