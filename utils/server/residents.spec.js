import axios from 'axios';

import * as residentsAPI from './residents';

jest.mock('axios');

const { ENDPOINT_MOSAIC, AWS_AUTHORIZATION } = process.env;

describe('residents APIs', () => {
  describe('getResidents', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 123, residents: 'bar' } });
      const data = await residentsAPI.getResidents({
        foo: 'bar',
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_MOSAIC}/residents`
      );
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        Authorization: AWS_AUTHORIZATION,
      });
      expect(data).toEqual({ foo: 123, residents: 'bar' });
    });
  });

  describe('getResident', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: 'foobar' });
      const data = await residentsAPI.getResident('foo', { bar: 'foobar' });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_MOSAIC}/residents/foo`
      );
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        Authorization: AWS_AUTHORIZATION,
      });
      expect(axios.get.mock.calls[0][1].params).toEqual({ bar: 'foobar' });
      expect(data).toEqual('foobar');
    });
  });
});
