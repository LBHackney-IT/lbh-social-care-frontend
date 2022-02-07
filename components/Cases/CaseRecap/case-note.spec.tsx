import CaseNote from '../../../pages/people/[id]/case-note';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';
import { mockedWorker } from 'factories/workers';
import { SubmissionState } from 'data/flexibleForms/forms.types';
import { useRouter } from 'next/router';

jest.mock('next/router');
const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;

const consoleErrorMock = jest
  .spyOn(console, 'error')
  .mockImplementation(jest.fn());

const mockRouter = {
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
  isReady: true,
  isPreview: false,
  isLocaleDomain: true,
};

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

let routerReplace: jest.Mock<any, any>;
const newError = new Error();
newError.message = 'HI1';

describe('Case note page', () => {
  beforeAll(() => {
    useRouterMock.mockReturnValue(mockRouter);
    routerReplace = (useRouterMock().replace as jest.Mock).mockRejectedValue(
      newError
    );
  });
  afterAll(() => {
    useRouterMock.mockReset();
  });
  it('catches an unhandled promise', async () => {
    render(<CaseNote {...mockedNewSubmission} />);
    await expect(routerReplace).rejects.toEqual(newError);

    expect(useRouterMock).toHaveBeenCalled();
    expect(routerReplace).toHaveBeenCalled();
    expect(consoleErrorMock).toHaveBeenCalled();
  });

  it('displays an alert banner when router.replace fails', async () => {
    const { getByText } = render(<CaseNote {...mockedNewSubmission} />);
    await expect(routerReplace).rejects.toEqual(newError);

    const warningMessage = getByText('There was a problem');
    expect(warningMessage).not.toBeNull();
    expect(consoleErrorMock).toHaveBeenCalled();
  });
});
