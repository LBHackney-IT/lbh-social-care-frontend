import CaseNote from '../../../pages/people/[id]/case-note';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';
import { mockedWorker } from 'factories/workers';
import { SubmissionState } from 'data/flexibleForms/forms.types';
import { useRouter } from 'next/router';

// jest.mock('next/router');
// const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;
// const mockedAxios = axios as jest.Mocked<typeof axios>;

let eventName;
let routeChangeHandler;

// useRouterMock.mockImplementation(() => {
//   return {
//     BaseRouter: { pathname: '/', route: '/', query: {}, asPath: '/' },
// events: {
//   on: jest.fn((event, callback) => {
//     eventName = event;
//     routeChangeHandler = callback;
//   }),
//   off: jest.fn((event, callback) => {
//     eventName = event;
//     routeChangeHandler = callback;
//   }),
// },
//   };
// });

jest.mock('next/router', () => ({
  useRouter() {
    return {
      basePath: '/',
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
      push: jest.fn(() => Promise.resolve(true)),
      replace: jest.fn(() => Promise.resolve(true)),
      reload: jest.fn(() => Promise.resolve(true)),
      prefetch: jest.fn(() => Promise.resolve()),
      back: jest.fn(() => Promise.resolve(true)),
      beforePopState: jest.fn(() => Promise.resolve(true)),
      isFallback: false,
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// const spyOnReplace = jest.spyOn(useRouter, 'replace');

const mockedResident = residentFactory.build();

const mockedNewSubmission = {
  submissionId: '',
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
  isImported: false,
  deleted: false,
  params: { id: '1234' },
};

describe('Case note page', () => {
  it('catches an unhandled promise', () => {
    // (useRouter().replace as jest.Mock).mockRejectedValue(new Error());
    // const router = useRouter();
    // router.query = { submissionId: '' };

    const { getByText } = render(<CaseNote {...mockedNewSubmission} />);

    expect(useRouter.useRouter).toHaveBeenCalled();
  });
});
