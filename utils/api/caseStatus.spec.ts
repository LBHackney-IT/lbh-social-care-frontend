import * as caseStatusAPI from './caseStatus';
import * as SWR from 'swr';
import axios from 'axios';

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
        '/api/casestatus/form-options/CIN'
      );
    });
  });

  describe('addCaseStatus', () => {
    it('calls the POST /api/casestatus endpoint', async () => {
      const formData = {
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
      const formData = {
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
});
