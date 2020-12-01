import { getQueryString } from './urls';

describe('urls', () => {
  describe('getQueryStrin', () => {
    it('should return empty string on empty object', () => {
      expect(getQueryString({})).toEqual('');
    });

    it('should return the proper string filtering empty values', () => {
      expect(
        getQueryString({
          foo: 123,
          bar: '',
          foobar: null,
          barfoo: 'yo',
          yo: true,
        })
      ).toEqual('foo=123&barfoo=yo&yo=true');
    });
  });
});
