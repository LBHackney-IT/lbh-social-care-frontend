import axios from 'axios';
import {
  finishSubmission,
  getSubmissionById,
  getUnfinishedSubmissions,
  patchResidents,
  patchSubmissionForStep,
  startSubmission,
  approveSubmission,
  panelApproveSubmission,
  returnForEdits,
  discardSubmission,
  generateSubmissionUrl,
} from './submissions';
import { mockedLegacyResident } from 'factories/residents';
import { mockSubmission } from 'factories/submissions';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

describe('getUnfinishedSubmissions', () => {
  it('should return a list of incomplete submissions', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        { submissionId: '123', formAnswers: {} },
        { submissionId: '456', formAnswers: {} },
      ],
    });
    const data = await getUnfinishedSubmissions();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions`,
      { headers: { 'x-api-key': AWS_KEY } }
    );
    expect(data).toEqual([
      { submissionId: '123', formAnswers: {} },
      { submissionId: '456', formAnswers: {} },
    ]);
  });

  it('only returns submissions in the requested age context', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          submissionId: '123',
          formAnswers: {},
          residents: [mockedLegacyResident],
        },
        {
          submissionId: '456',
          formAnswers: {},
          residents: [
            {
              ...mockedLegacyResident,
              ageContext: 'C',
            },
          ],
        },
      ],
    });
    const data = await getUnfinishedSubmissions('A');
    expect(data).toEqual([
      {
        submissionId: '123',
        formAnswers: {},
        residents: [mockedLegacyResident],
      },
    ]);
  });
});

describe('startSubmission', () => {
  it('should work properly', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { submissionId: '123' },
    });
    const data = await startSubmission('foo', 123, 'bar');
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions`,
      { formId: 'foo', socialCareId: 123, createdBy: 'bar' },
      { headers: { 'x-api-key': AWS_KEY } }
    );
    expect(data).toEqual({
      submissionId: '123',
    });
  });
});

describe('getSubmissionById', () => {
  it('should work properly', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { submissionId: '123', formAnswers: {} },
    });
    const data = await getSubmissionById('123');
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions/123`,
      { headers: { 'x-api-key': AWS_KEY } }
    );

    expect(data).toEqual({ submissionId: '123', formAnswers: {} });
  });
});

describe('patchResidents', () => {
  it('should work properly', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123' },
    });
    await patchResidents('123', 'foo@example.com', [1, 2]);
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions/123`,
      { editedBy: 'foo@example.com', residents: [1, 2] },
      { headers: { 'x-api-key': AWS_KEY } }
    );
  });
});

describe('finishSubmission', () => {
  it('should work properly', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123' },
    });

    await finishSubmission('foo', 'bar');
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions/foo`,
      { editedBy: 'bar', submissionState: 'submitted' },
      { headers: { 'x-api-key': AWS_KEY } }
    );
  });
});

describe('discardSubmission', () => {
  it('should work properly', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123' },
    });

    await discardSubmission('foo', 'bar');
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions/foo`,
      { editedBy: 'bar', submissionState: 'discarded' },
      { headers: { 'x-api-key': AWS_KEY } }
    );
  });
});

describe('patchSubmissionForStep', () => {
  it('should work properly', async () => {
    const mockAnswers = {
      'question one': 'answer one',
      'question two': 'answer two',
    };

    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123', formAnswers: {} },
    });
    const data = await patchSubmissionForStep('123', '456', 'foo', mockAnswers);
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions/123/steps/456`,
      {
        editedBy: 'foo',
        stepAnswers: JSON.stringify(mockAnswers),
        dateOfEvent: null,
      },
      { headers: { 'x-api-key': AWS_KEY } }
    );
    expect(data).toEqual({
      submissionId: '123',
      formAnswers: {},
    });
  });

  it('should work with a valid date', async () => {
    const mockAnswers = {
      'question one': 'answer one',
      'question two': 'answer two',
      'date of event': '2021-08-03',
    };

    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123', formAnswers: {} },
    });
    const data = await patchSubmissionForStep(
      '123',
      '456',
      'foo',
      mockAnswers,
      'date of event'
    );
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions/123/steps/456`,
      {
        editedBy: 'foo',
        stepAnswers: JSON.stringify(mockAnswers),
        dateOfEvent: '2021-08-03T00:00:00.000Z',
      },
      { headers: { 'x-api-key': AWS_KEY } }
    );
    expect(data).toEqual({
      submissionId: '123',
      formAnswers: {},
    });
  });

  it('should work with a valid date time', async () => {
    const mockAnswers = {
      'question one': 'answer one',
      'question two': 'answer two',
      'date of event': ['2021-08-02', '11:00'],
    };

    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123', formAnswers: {} },
    });
    const data = await patchSubmissionForStep(
      '123',
      '456',
      'foo',
      mockAnswers,
      'date of event'
    );
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions/123/steps/456`,
      {
        editedBy: 'foo',
        stepAnswers: JSON.stringify(mockAnswers),
        dateOfEvent: '2021-08-02T11:00:00.000Z',
      },
      { headers: { 'x-api-key': AWS_KEY } }
    );
    expect(data).toEqual({
      submissionId: '123',
      formAnswers: {},
    });
  });

  it('should submit null dateOfEvent if supplied ID does not match a question', async () => {
    const mockAnswers = {
      'question one': 'answer one',
      'question two': 'answer two',
      'date of event wrong id': ['2021-08-02', '11:00'],
    };

    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123', formAnswers: {} },
    });
    const data = await patchSubmissionForStep(
      '123',
      '456',
      'foo',
      mockAnswers,
      'date of event'
    );
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions/123/steps/456`,
      {
        editedBy: 'foo',
        stepAnswers: JSON.stringify(mockAnswers),
        dateOfEvent: null,
      },
      { headers: { 'x-api-key': AWS_KEY } }
    );
    expect(data).toEqual({
      submissionId: '123',
      formAnswers: {},
    });
  });

  it('should submit null dateOfEvent if supplied DateTime is invalid', async () => {
    const mockAnswers = {
      'question one': 'answer one',
      'question two': 'answer two',
      'date of event wrong id': ['2021-08-40', '11:00'],
    };

    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123', formAnswers: {} },
    });
    const data = await patchSubmissionForStep(
      '123',
      '456',
      'foo',
      mockAnswers,
      'date of event'
    );
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions/123/steps/456`,
      {
        editedBy: 'foo',
        stepAnswers: JSON.stringify(mockAnswers),
        dateOfEvent: null,
      },
      { headers: { 'x-api-key': AWS_KEY } }
    );
    expect(data).toEqual({
      submissionId: '123',
      formAnswers: {},
    });
  });

  it('should submit null dateOfEvent if supplied Date is invalid', async () => {
    const mockAnswers = {
      'question one': 'answer one',
      'question two': 'answer two',
      'date of event wrong id': '2021-08-40',
    };

    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123', formAnswers: {} },
    });
    const data = await patchSubmissionForStep(
      '123',
      '456',
      'foo',
      mockAnswers,
      'date of event'
    );
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${ENDPOINT_API}/submissions/123/steps/456`,
      {
        editedBy: 'foo',
        stepAnswers: JSON.stringify(mockAnswers),
        dateOfEvent: null,
      },
      { headers: { 'x-api-key': AWS_KEY } }
    );
    expect(data).toEqual({
      submissionId: '123',
      formAnswers: {},
    });
  });
});

describe('approveSubmission', () => {
  it('should work properly', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123' },
    });

    await approveSubmission('foo', 'bar');
    expect(mockedAxios.patch).toHaveBeenCalled();
    expect(mockedAxios.patch).toBeCalledWith(
      `${ENDPOINT_API}/submissions/foo`,
      {
        editedBy: 'bar',
        submissionState: 'approved',
      },
      {
        headers: {
          'x-api-key': AWS_KEY,
        },
      }
    );
  });
});

describe('approveSubmission', () => {
  it('should work properly', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123' },
    });

    await panelApproveSubmission('foo', 'bar');
    expect(mockedAxios.patch).toHaveBeenCalled();
    expect(mockedAxios.patch).toBeCalledWith(
      `${ENDPOINT_API}/submissions/foo`,
      {
        editedBy: 'bar',
        submissionState: 'panel_approved',
      },
      {
        headers: {
          'x-api-key': AWS_KEY,
        },
      }
    );
  });
});

describe('returnForEdits', () => {
  it('should work properly', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123' },
    });

    await returnForEdits('foo', 'bar', 'test reason');
    expect(mockedAxios.patch).toHaveBeenCalled();
    expect(mockedAxios.patch).toBeCalledWith(
      `${ENDPOINT_API}/submissions/foo`,
      {
        editedBy: 'bar',
        submissionState: 'in_progress',
        rejectionReason: 'test reason',
      },
      {
        headers: {
          'x-api-key': AWS_KEY,
        },
      }
    );
  });
});

describe('generateSubmissionUrl', () => {
  it('correctly generates a canonical-style url', () => {
    const result = generateSubmissionUrl({
      ...mockSubmission,
      formId: 'adult-case-note',
    });
    expect(result).toBe(
      `/people/${mockSubmission.residents[0].id}/case-note?submissionId=${mockSubmission.submissionId}`
    );
  });

  it('accepts a specific social care id', () => {
    const result = generateSubmissionUrl(
      {
        ...mockSubmission,
        formId: 'adult-case-note',
      },
      12345
    );
    expect(result).toBe(
      `/people/12345/case-note?submissionId=${mockSubmission.submissionId}`
    );
  });

  it('correctly generates a basic url', () => {
    const result = generateSubmissionUrl(mockSubmission);
    expect(result).toBe(`/submissions/${mockSubmission.submissionId}`);
  });
});
