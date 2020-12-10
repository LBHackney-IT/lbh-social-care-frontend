import axios from 'axios';

import * as postcodeAPI from './postcode';

jest.mock('axios');

const { POSTCODE_LOOKUP_URL, POSTCODE_LOOKUP_APIKEY } = process.env;

describe('postcode APIs', () => {
  describe('getAddresses', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: 'foo' });
      const data = await postcodeAPI.getAddresses('foobar');
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        `${POSTCODE_LOOKUP_URL}foobar`
      );
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        Authorization: POSTCODE_LOOKUP_APIKEY,
      });
      expect(data).toEqual('foo');
    });
  });
});
