import * as caseStatusAPI from './caseStatus';
import * as SWR from 'swr';

jest.mock('swr');
jest.mock('axios');

describe('caseStatusAPI', () => {
  describe('GetCaseStatus', () => {
    it('should get case statuses from the API', () => {
      jest.spyOn(SWR, 'default');
      caseStatusAPI.GetCaseStatus(123);
      expect(SWR.default).toHaveBeenCalledWith('/api/residents/123/casestatus');
    });
  });

  describe('GetFormValues', () => {
    it('should get form values from the API', () => {
      jest.spyOn(SWR, 'default');

      caseStatusAPI.GetFormValues('CIN');
      expect(SWR.default).toHaveBeenCalledWith(
        '/api/casestatus/form-options/CIN'
      );
    });
  });
});
