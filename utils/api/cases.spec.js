import axios from 'axios';

import * as casesAPI from './cases';
import * as SWR from 'swr';

jest.mock('axios');
jest.mock('swr');

const mockSWRInfinite = jest.fn();

describe('cases APIs', () => {
  describe('getCases', () => {
    it('should work properly', async () => {
      jest
        .spyOn(SWR, 'useSWRInfinite')
        .mockImplementation((getKey) =>
          mockSWRInfinite(getKey(0, { cases: [] }))
        );
      casesAPI.useCases({
        foo: 'bar',
      });
      expect(mockSWRInfinite).toHaveBeenCalledWith('/api/cases?foo=bar');
    });
  });

  describe('getCasesByResident', () => {
    it('should work properly', () => {
      jest
        .spyOn(SWR, 'useSWRInfinite')
        .mockImplementation((getKey) =>
          mockSWRInfinite(getKey(0, { cases: [] }))
        );
      casesAPI.useCasesByResident('foo', { bar: 'foobar' });
      expect(mockSWRInfinite).toHaveBeenCalledWith(
        '/api/residents/foo/cases?bar=foobar'
      );
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
