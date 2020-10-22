import axios from 'axios';

import * as residentsAPI from './residents';

jest.mock('axios');

const { AWS_ENDPOINT, AWS_SECRET, API_RESIDENTS } = process.env;

describe('residents APIs', () => {
  describe('getResidents', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 123, residents: 'bar' } });
      const data = await residentsAPI.getResidents({
        foo: 'bar',
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        `${AWS_ENDPOINT}${API_RESIDENTS}`
      );
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        Authorization: AWS_SECRET,
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
        `${AWS_ENDPOINT}${API_RESIDENTS}/foo`
      );
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        Authorization: AWS_SECRET,
      });
      expect(data).toEqual('foobar');
    });
  });
});
