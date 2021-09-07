import axios from 'axios';
import * as caseStatusAPI from './caseStatus';
import {
  mockedCaseStatusFactory,
  mockedCaseStatusAddRequest,
} from 'factories/caseStatus';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');

describe('case status APIs', () => {
  describe('GetCaseStatusByResident', () => {
    it("calls the service API's case status endpoint", async () => {
      const caseStatus = mockedCaseStatusFactory.build();
      mockedAxios.get.mockResolvedValue({
        data: caseStatus,
      });

      const data = await caseStatusAPI.getCaseStatusByPersonId(123);

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/residents/123/casestatuses`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual(caseStatus);
    });
  });

  describe('addCaseStatus', () => {
    it("calls the service API's POST case status endpoint", async () => {
      mockedAxios.post.mockResolvedValue({ data: {} });
      await caseStatusAPI.addCaseStatus({
        data: mockedCaseStatusAddRequest,
      });
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/residents/case-statuses`
      );
      expect(mockedAxios.post.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
    });
  });
});
