import axios from 'axios';

import * as allocatedWorkersAPI from './allocatedWorkers';

jest.mock('axios');

const { ENDPOINT_API, AWS_KEY } = process.env;

describe('allocatedWorkersAPI', () => {
  describe('getResidentAllocatedWorkers', () => {
    it.skip('should work properly', async () => {
      axios.get.mockResolvedValue({
        data: { allocations: 'hello' },
      });
      const data = await allocatedWorkersAPI.getResidentAllocatedWorkers(123);
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/allocations`);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(axios.get.mock.calls[0][1].params).toEqual({
        mosaic_id: 123,
      });
      expect(data).toEqual({ allocations: 'hello' });
    });
  });
});
