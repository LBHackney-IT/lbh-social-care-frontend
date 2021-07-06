import axios from 'axios';
import {
  finishSubmission,
  getSubmissionById,
  getUnfinishedSubmissions,
  patchResidents,
  patchSubmissionForStep,
  startSubmission,
} from './submissions';
import { mockedLegacyResident } from 'factories/residents';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const { ENDPOINT_API, AWS_KEY } = process.env;

describe('getUnfinishedSubmissions', () => {
  it('should return a list of incomplete submissions', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        { submissionId: '123', formAnswers: {} },
        { submissionId: '456', formAnswers: {} },
      ],
    });
    const data = await getUnfinishedSubmissions();
    expect(mockedAxios.get).toHaveBeenCalledWith(`${ENDPOINT_API}/submissions`, {"headers": {"x-api-key": AWS_KEY}});
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
    expect(mockedAxios.post).toHaveBeenCalledWith(`${ENDPOINT_API}/submissions`, {formId: "foo", socialCareId: 123, createdBy: "bar"}, {"headers": {"x-api-key": AWS_KEY}});
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
    expect(mockedAxios.get).toHaveBeenCalledWith(`${ENDPOINT_API}/submissions/123`, {"headers": {"x-api-key": AWS_KEY}});

    expect(data).toEqual({ submissionId: '123', formAnswers: {} });
  });
});

describe('patchResidents', () => {
  it('should work properly', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123' },
    });
    await patchResidents('123', "foo@example.com", [1, 2]);
    expect(mockedAxios.patch).toHaveBeenCalledWith(`${ENDPOINT_API}/submissions/123`, {editedBy: "foo@example.com", residents: [1, 2]}, {"headers": {"x-api-key": AWS_KEY}});
  });
});

describe('finishSubmission', () => {
  it('should work properly', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123' },
    });

    await finishSubmission('foo', 'bar');
    expect(mockedAxios.patch).toHaveBeenCalledWith(`${ENDPOINT_API}/submissions/foo`, {editedBy: "bar", submissionState: "submitted"}, {"headers": {"x-api-key": AWS_KEY}});
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
    expect(mockedAxios.patch).toHaveBeenCalledWith(`${ENDPOINT_API}/submissions/123/steps/456`, {editedBy: "foo", stepAnswers: JSON.stringify(mockAnswers)}, {"headers": {"x-api-key": AWS_KEY}});
    expect(data).toEqual({
      submissionId: '123',
      formAnswers: {},
    });
  });
});
