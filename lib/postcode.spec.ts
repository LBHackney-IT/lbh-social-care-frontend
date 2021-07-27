import axios from 'axios';

import * as postcodeAPI from './postcode';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const POSTCODE_LOOKUP_URL = process.env.POSTCODE_LOOKUP_URL;
const POSTCODE_LOOKUP_APIKEY = process.env.POSTCODE_LOOKUP_APIKEY;

describe('postcode APIs', () => {
  describe('getAddresses', () => {
    it('should work properly', async () => {
      mockedAxios.get.mockResolvedValue({ data: { data: 'foo' } });
      const data = await postcodeAPI.getAddresses('foobar');
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get.mock.calls[0][0]).toEqual(
        `${POSTCODE_LOOKUP_URL}foobar`
      );
      expect(mockedAxios.get.mock.calls[0][1]?.headers).toEqual({
        Authorization: POSTCODE_LOOKUP_APIKEY,
      });
      expect(data).toEqual('foo');
    });
  });
});
