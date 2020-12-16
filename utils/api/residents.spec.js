import axios from 'axios';

import * as residentsAPI from './residents';

jest.mock('axios');

describe('residents APIs', () => {
  describe('getResidents', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 'bar' } });
      const data = await residentsAPI.getResidents({
        foo: 'bar',
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual('/api/residents');
      expect(data).toEqual({ foo: 'bar' });
    });
  });

  describe('getResident', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: 'foobar' });
      const data = await residentsAPI.getResident('foo', { bar: 'foobar' });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual('/api/residents/foo');
      expect(axios.get.mock.calls[0][1]).toEqual({ params: { bar: 'foobar' } });
      expect(data).toEqual('foobar');
    });
  });

  describe('getResidentCases', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: 'foobar' });
      const data = await residentsAPI.getResidentCases('foo');
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual('/api/residents/foo/cases');
      expect(data).toEqual('foobar');
    });
  });

  describe('addResident', () => {
    it('should work properly', async () => {
      axios.post.mockResolvedValue({ data: 'foobar' });
      const data = await residentsAPI.addResident({ foo: 'bar' });
      expect(axios.post).toHaveBeenCalled();
      expect(axios.post.mock.calls[0][0]).toEqual('/api/residents');
      expect(axios.post.mock.calls[0][1]).toEqual({ foo: 'bar' });
      expect(data).toEqual('foobar');
    });
  });
});
