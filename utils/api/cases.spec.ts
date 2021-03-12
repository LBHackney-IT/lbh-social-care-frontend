import axios from 'axios';

import * as casesAPI from './cases';
import * as SWR from 'swr';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('swr');

const mockSWRInfinite = jest.fn();

describe('cases APIs', () => {
  describe('useCases', () => {
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

  describe('useCasesByResident', () => {
    it('should work properly', () => {
      jest
        .spyOn(SWR, 'useSWRInfinite')
        .mockImplementation((getKey) =>
          mockSWRInfinite(getKey(0, { cases: [] }))
        );
      casesAPI.useCasesByResident(123, { bar: 'foobar' });
      expect(mockSWRInfinite).toHaveBeenCalledWith(
        '/api/residents/123/cases?bar=foobar'
      );
    });
  });

  describe('useCase', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      casesAPI.useCase(123);
      expect(SWR.default).toHaveBeenCalledWith('/api/cases/123');
    });
  });

  describe('addCase', () => {
    it('should work properly', async () => {
      mockedAxios.post.mockResolvedValue({ data: 'foobar' });
      const data = await casesAPI.addCase({ foo: 'bar' });
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post.mock.calls[0][0]).toEqual('/api/cases');
      expect(mockedAxios.post.mock.calls[0][1]).toEqual({ foo: 'bar' });
      expect(data).toEqual('foobar');
    });
  });
});
