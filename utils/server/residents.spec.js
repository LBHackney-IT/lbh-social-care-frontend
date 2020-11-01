import axios from 'axios';

import * as residentsAPI from './residents';

jest.mock('axios');

const {
  ENDPOINT_API,
  ENDPOINT_MOSAIC,
  AWS_KEY,
  AWS_AUTHORIZATION,
} = process.env;

describe('residents APIs', () => {
  describe('getResidents', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 123, residents: 'bar' } });
      const data = await residentsAPI.getResidents({
        foo: 'bar',
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/residents`);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual('bar');
    });
  });

  describe('getResident', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: 'foobar' });
      const data = await residentsAPI.getResident('foo');
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_MOSAIC}/residents/foo`
      );
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        Authorization: AWS_AUTHORIZATION,
      });
      expect(data).toEqual('foobar');
    });
  });

  describe('getResidentCases', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 123, cases: 'bar' } });
      const data = await residentsAPI.getResidentCases(123);
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        `${ENDPOINT_API}/residents/cases`
      );
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(axios.get.mock.calls[0][1].params).toEqual({
        mosaic_id: 123,
      });
      expect(data).toEqual('bar');
    });
  });
});
