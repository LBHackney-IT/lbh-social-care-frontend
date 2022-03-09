import * as searchAPI from './search';
import * as SWR from 'swr';

jest.mock('axios');
jest.mock('swr');

const mockSWRInfinite = jest.fn();

describe('searchAPI', () => {
  it('should work properly', async () => {
    jest
      .spyOn(SWR, 'useSWRInfinite')
      .mockImplementation(
        (getKey: (page: number, data: Record<string, unknown>) => string) =>
          mockSWRInfinite(getKey(0, { residents: [] }))
      );
    searchAPI.SearchPerson({
      foo: 'bar',
    });
    expect(mockSWRInfinite).toHaveBeenCalledWith('/api/search/person?foo=bar');
  });
});
