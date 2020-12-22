import axios from 'axios';

import * as allocatedWorkersAPI from './allocatedWorkers';

jest.mock('axios');

describe('allocatedWorkers APIs', () => {
  describe('getAllocatedWorkers', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 'bar' } });
      const data = await allocatedWorkersAPI.getAllocatedWorkers(123);
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        '/api/residents/123/allocated-workers'
      );
      expect(data).toEqual({ foo: 'bar' });
    });
  });
});
