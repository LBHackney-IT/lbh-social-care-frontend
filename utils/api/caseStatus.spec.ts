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

  describe('addCaseStatus', () => {
    it('should get form values from the API', () => {
      jest.spyOn(SWR, 'default');
      caseStatusAPI.AddCaseStatus({
        personId: 123,
        type: 'CIN',
        startDate: new Date().toDateString(),
        notes: 'blabla',
        createdby: 'jack.musajo@hackney.gov.uk',
      });
      expect(SWR.default).toHaveBeenCalledWith('/api/casestatus');
    });
  });
});
