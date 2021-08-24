import * as caseStatusAPI from './caseStatus';
import * as SWR from 'swr';
<<<<<<< HEAD
=======
import axios from 'axios';
>>>>>>> main

jest.mock('swr');
jest.mock('axios');

describe('caseStatusAPI', () => {
<<<<<<< HEAD
  describe('getCaseStatus', () => {
    it('should get case statuses from the API', () => {
      jest.spyOn(SWR, 'default');
      caseStatusAPI.getCaseStatus(123);
=======
  describe('GetCaseStatus', () => {
    it('should get case statuses from the API', () => {
      jest.spyOn(SWR, 'default');
      caseStatusAPI.GetCaseStatus(123);
>>>>>>> main
      expect(SWR.default).toHaveBeenCalledWith('/api/residents/123/casestatus');
    });
  });
});
