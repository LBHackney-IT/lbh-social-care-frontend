import axios from 'axios';
import {
  finishSubmission,
  getSubmissionById,
  getUnfinishedSubmissions,
  patchResidents,
  patchSubmissionForStep,
  startSubmission,
} from './submissions';
import MockDate from 'mockdate';
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
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(mockedAxios.get.mock.calls[0][0]).toEqual(
      `${ENDPOINT_API}/submissions`
    );
    expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
      'x-api-key': AWS_KEY,
    });
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
    const data = await startSubmission('bar', 123, 'boo');
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post.mock.calls[0][0]).toEqual(
      `${ENDPOINT_API}/submissions`
    );
    expect(mockedAxios.post.mock.calls[0][1]).toEqual({
      formId: 'bar',
      socialCareId: 123,
      createdBy: 'boo',
    });
    expect(mockedAxios.post.mock.calls[0][2]?.headers).toEqual({
      'x-api-key': AWS_KEY,
    });
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
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(mockedAxios.get.mock.calls[0][0]).toEqual(
      `${ENDPOINT_API}/submissions/123`
    );

    expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
      'x-api-key': AWS_KEY,
    });

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
    MockDate.set('2000-11-22');

    await finishSubmission('foo', 'bar');
    expect(mockedAxios.patch).toHaveBeenCalledWith(`${ENDPOINT_API}/submissions/foo`, {editedBy: "bar", submissionState: "submitted"}, {"headers": {"x-api-key": AWS_KEY}});
  });
});

const mockAnswers = {
  'question one': 'answer one',
  'question two': 'answer two',
};

describe('patchSubmissionForStep', () => {
  it('should work properly', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: { submissionId: '123', formAnswers: {} },
    });
    const data = await patchSubmissionForStep('123', '456', 'foo', mockAnswers);
    expect(mockedAxios.patch).toHaveBeenCalled();
    expect(mockedAxios.patch.mock.calls[0][0]).toEqual(
      `${ENDPOINT_API}/submissions/123/steps/456`
    );
    expect(mockedAxios.patch.mock.calls[0][1]).toEqual({
      stepAnswers: JSON.stringify(mockAnswers),
      editedBy: 'foo',
    });
    expect(mockedAxios.patch.mock.calls[0][2]?.headers).toEqual({
      'x-api-key': AWS_KEY,
    });
    expect(data).toEqual({
      submissionId: '123',
      formAnswers: {},
    });
  });
});
