import * as caseStatusAPI from './caseStatus';
import * as SWR from 'swr';
import axios from 'axios';

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
});
