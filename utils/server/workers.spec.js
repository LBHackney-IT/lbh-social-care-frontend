import axios from 'axios';

import * as workersAPI from './workers';

jest.mock('axios');

const { ENDPOINT_API, AWS_KEY } = process.env;

describe('workers APIs', () => {
  describe('getWorkers', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 123, workers: 'bar' } });
      const data = await workersAPI.getWorkers({
        foo: 'bar',
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/workers`);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(axios.get.mock.calls[0][1].params).toEqual({
        foo: 'bar',
      });
      expect(data).toEqual({ foo: 123, workers: 'bar' });
    });
  });
});
