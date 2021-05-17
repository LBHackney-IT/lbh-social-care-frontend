import * as meAPI from './me';
import * as SWR from 'swr';

jest.mock('swr');

describe('me APIs', () => {
  describe('useMyData', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      meAPI.useMyData();
      expect(SWR.default).toHaveBeenCalledWith('/api/me');
    });
  });
});
