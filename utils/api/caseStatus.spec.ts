import * as caseStatusAPI from './caseStatus';
import * as SWR from 'swr';
import axios from 'axios';
import { EditCaseStatusFormData, AddCaseStatusFormData } from '../../types';

jest.mock('swr');
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('caseStatusAPI', () => {
  describe('useCaseStatuses', () => {
    it('should get case statuses from the API', () => {
      jest.spyOn(SWR, 'default');
      caseStatusAPI.useCaseStatuses(123);
      expect(SWR.default).toHaveBeenCalledWith('/api/residents/123/casestatus');
    });
  });

  describe('useFormValues', () => {
    it('should get form values from the API', () => {
      jest.spyOn(SWR, 'default');

      caseStatusAPI.useFormValues('CIN');
      expect(SWR.default).toHaveBeenCalledWith(
        '/api/casestatus/form-options?type=CIN'
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
      const formData: EditCaseStatusFormData = {
        personId: 43,
        caseStatusID: 16,
        startDate: '2021-10-07',
        endDate: '2021-10-08',
        values: [
          {
            name: 'legalStatus',
            selected: 'L3',
          },
          {
            name: 'placementReason',
            selected: 'R5',
          },
        ],
        editedBy: 'jack.musajo@hackney.gov.uk',
      };
      jest.spyOn(axios, 'post');

      await caseStatusAPI.updateCaseStatus(formData);

      expect(axios.post).toHaveBeenCalledWith('/api/casestatus', formData);
    });

    it('returns response from POST /api/casestatus endpoint when updating LAC', async () => {
      const formData: EditCaseStatusFormData = {
        personId: 43,
        caseStatusID: 16,
        startDate: new Date().toDateString(),
        endDate: '2021-10-08',
        editedBy: 'jack.musajo@hackney.gov.uk',
      };
      const apiResponse = { data: 'foobar' };

      mockedAxios.post.mockResolvedValue(apiResponse);

      const response = await caseStatusAPI.updateCaseStatus(formData);

      expect(response).toBe(apiResponse.data);
    });
  });
});
