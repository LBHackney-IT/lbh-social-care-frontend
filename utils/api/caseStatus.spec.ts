import * as caseStatusAPI from './caseStatus';
import * as SWR from 'swr';

jest.mock('swr');
jest.mock('axios');

describe('caseStatusAPI', () => {
  describe('getCaseStatus', () => {
    it('should get case statuses from the API', () => {
      jest.spyOn(SWR, 'default');
      caseStatusAPI.getCaseStatus(123);
      expect(SWR.default).toHaveBeenCalledWith('/api/residents/123/casestatus');
    });
  });
});
