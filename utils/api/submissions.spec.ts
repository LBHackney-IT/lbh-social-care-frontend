import { useUnfinishedSubmissions } from './submissions';
import * as SWR from 'swr';

jest.mock('swr');

describe('residents APIs', () => {
  describe('useUnfinishedSubmissions', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      useUnfinishedSubmissions();
      expect(SWR.default).toHaveBeenCalled();
    });
  });
});
