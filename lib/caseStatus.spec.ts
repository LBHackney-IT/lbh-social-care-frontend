import axios from 'axios';
import * as caseStatusAPI from './caseStatus';
import {
  mockedCaseStatusFactory,
  mockedFormValueFactory,
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

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${ENDPOINT_API}/residents/123/casestatuses`,
        { headers: { 'x-api-key': AWS_KEY } }
      );
      expect(data).toEqual(caseStatus);
    });
  });
});

describe('case form values APIs', () => {
  describe('GetFormValues', () => {
    it("calls the service API's form values endpoint", async () => {
      const mockedData = mockedFormValueFactory.build();

      mockedAxios.get.mockResolvedValue({
        data: mockedData,
      });

      const data = await caseStatusAPI.GetFormValues('CIN');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${ENDPOINT_API}/case-status/form-options/CIN`,
        { headers: { 'x-api-key': AWS_KEY } }
      );
      expect(data).toEqual(mockedData);
    });
  });
});
