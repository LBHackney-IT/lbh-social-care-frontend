import axios from 'axios';

import * as residentsAPI from './residents';
import * as SWR from 'swr';

jest.mock('axios');
jest.mock('swr');

const mockSWRInfinite = jest.fn();

describe('residents APIs', () => {
  describe('useResidents', () => {
    it('should work properly', () => {
      jest
        .spyOn(SWR, 'useSWRInfinite')
        .mockImplementation((getKey) =>
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
      residentsAPI.useResident('foo', { bar: 'foobar' });
      expect(SWR.default).toHaveBeenCalledWith('/api/residents/foo');
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
