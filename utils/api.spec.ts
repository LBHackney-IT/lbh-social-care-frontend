import { getInfiniteKey } from 'utils/api';

describe('urls', () => {
  describe('getInfiniteKey', () => {
    it('should work properly', () => {
      expect(
        getInfiniteKey('/foo', 'key_foo', { foo: 'bar' })(0, { key_foo: [] })
      ).toBe('/foo?foo=bar');
    });

    it('should return null if key not specified', () => {
      expect(getInfiniteKey('/foo', 'key_foo', { foo: 'bar' })(0, {})).toBe(
        null
      );
    });

    it('should return the next cursor if pageIndex bigger than 0', () => {
      expect(
        getInfiniteKey('/foo', 'key_foo', { foo: 'bar' })(1, {
          key_foo: [],
          nextCursor: 'next',
        })
      ).toBe('/foo?foo=bar&cursor=next');
    });
  });
});
