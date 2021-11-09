import * as caseStatusAPI from './caseStatus';
import * as SWR from 'swr';
import axios from 'axios';
import {
  AddCaseStatusFormData,
  UpdateLACCaseStatusFormData,
} from '../../types';

jest.mock('swr');
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('caseStatusAPI', () => {
  describe('useCaseStatuses', () => {
    it('should get case statuses from the API', () => {
      jest.spyOn(SWR, 'default');
      caseStatusAPI.useCaseStatuses(123);
      expect(SWR.default).toHaveBeenCalledWith(
        '/api/residents/123/casestatus?include_closed_cases=false'
      );
    });
  });

  describe('addCaseStatus', () => {
    it('calls the POST /api/casestatus endpoint', async () => {
      const formData: AddCaseStatusFormData = {
        personId: 123,
        type: 'CIN',
        startDate: new Date().toDateString(),
        notes: 'blabla',
        createdby: 'jack.musajo@hackney.gov.uk',
      };
      jest.spyOn(axios, 'post');

      await caseStatusAPI.addCaseStatus(formData);

      expect(axios.post).toHaveBeenCalledWith('/api/casestatus', formData);
    });

    it('returns response from POST /api/casestatus endpoint', async () => {
      const formData: AddCaseStatusFormData = {
        personId: 123,
        type: 'CIN',
        startDate: new Date().toDateString(),
        notes: 'blabla',
        createdby: 'jack.musajo@hackney.gov.uk',
      };
      const apiResponse = { data: 'foobar' };

      mockedAxios.post.mockResolvedValue(apiResponse);

      const response = await caseStatusAPI.addCaseStatus(formData);

      expect(response).toBe(apiResponse.data);
    });
  });

  describe('updateCaseStatus', () => {
    it('calls the POST /api/casestatus endpoint when updating LAC', async () => {
      const formData: UpdateLACCaseStatusFormData = {
        caseStatusID: 16,
        startDate: '2021-10-07',
        answers: [
          {
            option: 'legalStatus',
            value: 'L3',
          },
          {
            option: 'placementType',
            value: 'R5',
          },
        ],
        createdBy: 'jack.musajo@hackney.gov.uk',
      };
      jest.spyOn(axios, 'post');
      const caseStatusID = formData.caseStatusID;
      await caseStatusAPI.updateCaseStatus(formData, caseStatusID);

      expect(axios.post).toHaveBeenCalledWith(
        `/api/casestatus/update/${caseStatusID}`,
        formData
      );
    });

    it('returns response from POST /api/casestatus endpoint when updating LAC', async () => {
      const formData: UpdateLACCaseStatusFormData = {
        caseStatusID: 16,
        startDate: new Date().toDateString(),
        answers: [
          {
            option: 'legalStatus',
            value: 'L3',
          },
          {
            option: 'placementType',
            value: 'R5',
          },
        ],
        createdBy: 'jack.musajo@hackney.gov.uk',
      };
      const apiResponse = { data: 'foobar' };

      mockedAxios.post.mockResolvedValue(apiResponse);
      const caseStatusID = formData.caseStatusID;
      const response = await caseStatusAPI.updateCaseStatus(
        formData,
        caseStatusID
      );

      expect(response).toBe(apiResponse.data);
    });
  });
});
