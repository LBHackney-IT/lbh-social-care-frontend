import { deepmerge, sanitiseObject, setValues } from './objects';

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

  describe('sanitiseObject', () => {
    it('should work properly', () => {
      const obj = {
        show_next_input: 'Y',
        show_next_step: false,
        show_multi_select_step: true,
        show_object_step: true,
        conditional_text: '',
        yo: undefined,
        bar: null,
        obj: { phoneNumber: '', phoneType: '' },
        phone_number: [{ phoneNumber: '123123', phoneType: '' }],
        phone_number_not_required: [{ phoneNumber: '', phoneType: '' }],
        array: [''],
        emptyArray: [],
        arr: ['foo', 123],
        first_select: '',
        'last-step': [{ title_3: '' }],
        cippa: { yo: { asd: { asd: 123 }, qwe: '' } },
        lippa: { yo: { asd: { asd: '' }, qwe: { ooo: '' } } },
      };

      expect(sanitiseObject(obj)).toEqual({
        show_next_input: 'Y',
        show_next_step: false,
        show_multi_select_step: true,
        show_object_step: true,
        phone_number: [{ phoneNumber: '123123', phoneType: '' }],
        arr: ['foo', 123],
        cippa: { yo: { asd: { asd: 123 } } },
      });
    });
  });

  describe('setValues', () => {
    it('should work properly', () => {
      expect(setValues({ foo: 'bar', foobar: true }, false)).toEqual({
        foo: false,
        foobar: false,
      });
    });
  });
});
