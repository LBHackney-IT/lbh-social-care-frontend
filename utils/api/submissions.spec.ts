import { useSubmission, useUnfinishedSubmissions } from './submissions';
import * as SWR from 'swr';

jest.mock('swr');

describe('submissions APIs', () => {
  describe('useUnfinishedSubmissions', () => {
    it('should call swr and pass the person id as a query filter', () => {
      jest.spyOn(SWR, 'default');
      useUnfinishedSubmissions(1, 1, 5);
      expect(SWR.default).toHaveBeenLastCalledWith(
        '/api/submissions?page=1&size=5&personID=1&submissionStates=in_progress'
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
