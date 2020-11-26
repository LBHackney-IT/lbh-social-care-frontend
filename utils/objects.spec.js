import { deepmerge } from './objects';

describe('objects util', () => {
  describe('deepmerge', () => {
    it('should work properly', () => {
      const obj1 = {
        foo: 'bar',
        bar: [
          {
            foo: '1',
            check: '',
          },
        ],
        foobar: 'qwe',
      };
      const obj2 = {
        bar: [undefined, { foo: '2' }],
      };
      expect(deepmerge(obj1, obj2)).toEqual({
        foo: 'bar',
        bar: [
          {
            foo: '1',
            check: '',
          },
          { foo: '2' },
        ],
        foobar: 'qwe',
      });
    });
  });
});
