import CaseNote from '../../../pages/people/[id]/case-note';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { residentFactory } from 'factories/residents';
import { mockedWorker } from 'factories/workers';
import { SubmissionState } from 'data/flexibleForms/forms.types';
import { useRouter } from 'next/router';
// import { act } from 'react-dom/test-utils';

jest.mock('next/router');
const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;
// const mockedAxios = axios as jest.Mocked<typeof axios>;

const consoleSpy = jest.spyOn(console, 'error').mockImplementation((error) => {
  console.log(error.message);
});
const consoleLogSpy = jest.spyOn(global.console, 'log');
// .mockImplementation(() => jest.fn());

// let eventName;
// let routeChangeHandler;

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

// jest.mock('next/router');
// const useRouterMock = () => ({
//   useRouter() {
//     return {
//       basePath: '/',
//       pathname: '/',
//       route: '/',
//       query: {},
//       asPath: '/',
//       push: jest.fn(() => Promise.resolve(true)),
//       replace: jest.fn(() => Promise.resolve(true)),
//       reload: jest.fn(() => Promise.resolve(true)),
//       prefetch: jest.fn(() => Promise.resolve()),
//       back: jest.fn(() => Promise.resolve(true)),
//       beforePopState: jest.fn(() => Promise.resolve(true)),
//       isFallback: false,
//       events: {
//         on: jest.fn(),
//         off: jest.fn(),
//         emit: jest.fn(),
//       },
//     };
//   },
// });

const mockRouter = {
  basePath: '/',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(false)),
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
  isReady: true,
  isPreview: false,
  isLocaleDomain: true,
};

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
  // beforeEach(() => {
  //   consoleSpy.mockClear();
  //   consoleLogSpy.mockClear();
  // });
  afterEach(() => {
    consoleSpy.mockReset();
  });
  it('catches an unhandled promise', async () => {
    // (useRouter().replace as jest.Mock).mockRejectedValue(new Error());
    // const router = useRouter();
    // router.query = { submissionId: '' };
    useRouterMock.mockReturnValue(mockRouter);
    const newError = new Error();
    newError.message = 'HI1';
    (useRouterMock().replace as jest.Mock).mockRejectedValue(newError);

    let warningBanner;
    // act(() => {
    const { getByText } = render(<CaseNote {...mockedNewSubmission} />);

    await waitFor(() => {
      fireEvent.click(getByText('Save and finish'));
    });
    // warningBanner = getByRole('alert');
    // });
    // expect(await screen.getByRole('alert')).toBeVisible;
    const warningMessage = getByText(
      'There was a problem finishing the submission'
    );

    expect(warningMessage).not.toBeNull();

    expect(useRouterMock).toHaveBeenCalled();
    expect(useRouterMock().replace).toHaveBeenCalled();
    expect(warningBanner).not.toBeNull();
    // expect(() => {
    //   consoleSpy;
    // }).toThrowError();

    expect(consoleSpy).toHaveBeenCalled();
    // expect(consoleSpy).toHaveErrorMessage();
    // expect(consoleLogSpy).toHaveBeenCalled();
  });
});
