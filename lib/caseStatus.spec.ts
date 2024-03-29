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

      const data = await caseStatusAPI.getCaseStatusByPersonId(123, 'false');

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/residents/123/case-statuses?include_closed_cases=false`
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
      await caseStatusAPI.addCaseStatus(123, {
        data: mockedCaseStatusAddRequest,
      });
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/residents/123/case-statuses`
      );
      expect(mockedAxios.post.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
    });
  });

  describe('updateCaseStatus', () => {
    it("calls the service API's update POST case status endpoint", async () => {
      const caseStatusId = 16;
      mockedAxios.post.mockResolvedValue({ data: {} });
      await caseStatusAPI.updateCaseStatus(caseStatusId, {
        data: mockedCaseStatusAddRequest,
      });
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/case-statuses/${caseStatusId}/answers`
      );
      expect(mockedAxios.post.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
    });
  });

  describe('patchCaseStatus', () => {
    it("calls the service API's PATCH case status endpoint", async () => {
      const caseStatusId = 123;
      mockedAxios.patch.mockResolvedValue({ data: {} });

      await caseStatusAPI.patchCaseStatus(caseStatusId, {
        data: mockedCaseStatusAddRequest,
      });

      expect(mockedAxios.patch).toHaveBeenCalled();
      expect(mockedAxios.patch.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/case-statuses/${caseStatusId}/`
      );
      expect(mockedAxios.patch.mock.calls[0][2]?.headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
    });
  });
});
