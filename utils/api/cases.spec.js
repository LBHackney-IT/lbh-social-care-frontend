import axios from 'axios';

import * as casesAPI from './cases';

jest.mock('axios');

describe('cases APIs', () => {
  describe('getCases', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 'bar' } });
      const data = await casesAPI.getCases({
        foo: 'bar',
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual('/api/cases');
      expect(data).toEqual({ foo: 'bar' });
    });
  });

  describe('getCasesByResident', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: 'foobar' });
      const data = await casesAPI.getCasesByResident('foo', { cursor: 321 });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual('/api/residents/foo/cases');
      expect(axios.get.mock.calls[0][1]).toEqual({ params: { cursor: 321 } });
      expect(data).toEqual('foobar');
    });
  });

  describe('addCase', () => {
    it('should work properly', async () => {
      axios.post.mockResolvedValue({ data: 'foobar' });
      const data = await casesAPI.addCase({ foo: 'bar' });
      expect(axios.post).toHaveBeenCalled();
      expect(axios.post.mock.calls[0][0]).toEqual('/api/cases');
      expect(axios.post.mock.calls[0][1]).toEqual({ foo: 'bar' });
      expect(data).toEqual('foobar');
    });
  });
});
