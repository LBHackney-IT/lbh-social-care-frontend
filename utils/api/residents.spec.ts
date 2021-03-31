import axios from 'axios';

import * as residentsAPI from './residents';
import * as SWR from 'swr';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('swr');

const mockSWRInfinite = jest.fn();

describe('residents APIs', () => {
  describe('useResidents', () => {
    it('should work properly', () => {
      jest
        .spyOn(SWR, 'useSWRInfinite')
        .mockImplementation(
          (getKey: (page: number, data: Record<string, unknown>) => string) =>
            mockSWRInfinite(getKey(0, { residents: [] }))
        );
      residentsAPI.useResidents({
        foo: 'bar',
      });
      expect(mockSWRInfinite).toHaveBeenCalledWith('/api/residents?foo=bar');
    });
  });

  describe('useResident', () => {
    it('should work properly', () => {
      jest.spyOn(SWR, 'default');
      residentsAPI.useResident(123);
      expect(SWR.default).toHaveBeenCalledWith('/api/residents/123');
    });
  });

  describe('addResident', () => {
    it('should work properly', async () => {
      mockedAxios.post.mockResolvedValue({
        data: { foo: 'bar', personId: 123 },
      });
      const data = await residentsAPI.addResident({
        foo: 'bar',
      });
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post.mock.calls[0][0]).toEqual('/api/residents');
      expect(mockedAxios.post.mock.calls[0][1]).toEqual({ foo: 'bar' });
      expect(data).toEqual({
        data: { foo: 'bar', personId: 123 },
        ref: 123,
      });
    });
  });
});
