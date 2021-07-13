import { useUnfinishedSubmissions } from './submissions';
import * as SWR from 'swr';

jest.mock('swr');

describe('residents APIs', () => {
  describe('useResident', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      useUnfinishedSubmissions();
      expect(SWR.default).toHaveBeenCalled();
    });
  });
});
