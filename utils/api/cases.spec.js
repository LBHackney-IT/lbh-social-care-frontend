import axios from 'axios';

import * as casesAPI from './cases';

jest.mock('axios');

const { AWS_KEY, ENDPOINT_CASES } = process.env;

describe('cases APIs', () => {
  describe('getCases', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 123, cases: 'bar' } });
      const data = await casesAPI.getCases(123);
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(ENDPOINT_CASES);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        'x-api-key': AWS_KEY
      });
      expect(axios.get.mock.calls[0][1].params).toEqual({
        mosaic_id: 123
      });
      expect(data).toEqual('bar');
    });
  });
});
