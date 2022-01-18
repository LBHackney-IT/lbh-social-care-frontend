import * as workersAPI from './workers';
import * as SWR from 'swr';

jest.mock('swr');
jest.mock('axios');

describe('workersAPI', () => {
  describe('useWorkersSearch', () => {
    it('should get workers from the workers search', () => {
      jest.spyOn(SWR, 'default');
      workersAPI.useWorkersSearch('test');
      expect(SWR.default).toHaveBeenCalledWith(
        `/api/workersearch?workerName=test`
      );
    });

    it('should not return any workers if no worker name is passed in', () => {
      jest.spyOn(SWR, 'default');
      workersAPI.useWorkersSearch('');
      expect(SWR.default).toHaveBeenCalledWith(null);
    });
  });
});
