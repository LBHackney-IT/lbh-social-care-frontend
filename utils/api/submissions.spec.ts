import { useSubmission, useUnfinishedSubmissions } from './submissions';
import * as SWR from 'swr';

jest.mock('swr');

describe('submissions APIs', () => {
  describe('useUnfinishedSubmissions', () => {
    it('should call swr and pass the person id as a query filter', () => {
      jest.spyOn(SWR, 'default');
      useUnfinishedSubmissions(1);
      expect(SWR.default).toHaveBeenLastCalledWith(
        '/api/submissions?personId=1'
      );
    });
  });

  describe('useSubmission', () => {
    it('should call swr', () => {
      jest.spyOn(SWR, 'default');
      useSubmission('foo');
      expect(SWR.default).toHaveBeenLastCalledWith('/api/submissions/foo');
    });
  });
});
