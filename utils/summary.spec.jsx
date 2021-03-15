import { formatData, getSectionObject } from './summary';

describe('Summary utils', () => {
  describe('formatData', () => {
    it('should format "AddressLookup" properly', () => {
      const componentProps = {
        component: 'AddressLookup',
        name: 'main_address',
        label: 'main address',
      };
      const formData = {
        main_address: {
          address: 'first line, second line, third line',
          postcode: 'postcode',
          uprn: '123123',
        },
      };
      expect(formatData(componentProps, formData)).toMatchSnapshot();
    });

    it('should format "DateInput" properly', () => {
      const componentProps = {
        component: 'DateInput',
        name: 'first_date',
        label: 'Frst date',
      };
      const formData = {
        first_date: '2000-10-01',
      };
      expect(formatData(componentProps, formData)).toEqual({
        key: 'first_date',
        title: 'Frst date',
        value: '01/10/2000',
      });
    });

    it('should format "ObjectInput" properly', () => {
      const objectComponents = [
        {
          component: 'TextInput',
          name: 'first',
        },
        {
          component: 'TextInput',
          name: 'second',
        },
        {
          component: 'TextInput',
          name: 'third',
        },
      ];
      const componentProps = {
        component: 'ObjectInput',
        label: 'I am object component',
        name: 'oo',
        components: objectComponents,
      };
      const componentPropsInline = {
        component: 'ObjectInput',
        label: 'I am object component inline',
        name: 'oi',
        summaryInline: true,
        components: objectComponents,
      };
      const formData = {
        oo: { first: 'first', second: 'second', third: 'third' },
        oi: { first: 'first', second: 'second', third: 'third' },
      };
      expect(formatData(componentProps, formData)).toMatchSnapshot();
      expect(formatData(componentPropsInline, formData)).toMatchSnapshot();
    });

    it('should format "Checkbox" properly', () => {
      const componentProps = {
        component: 'Checkbox',
        label: 'I am checkbox component',
        name: 'checkbox',
        options: [
          { text: 'Foo', value: 'foo' },
          { text: 'Bar', value: 'bar' },
          { text: 'Foobar', value: 'foobar' },
          { text: 'Barfoo', value: 'barfoo' },
        ],
      };
      const formData = {
        checkbox: ['foo', 'bar', 'foobar'],
      };
      expect(formatData(componentProps, formData)).toMatchSnapshot();
    });

    it('should format "Select" properly', () => {
      const SelectProps = {
        component: 'Select',
        name: 'select',
        label: 'Select component',
        options: ['Yes', 'No'],
      };
      const SubSelectProps = {
        component: 'Select',
        name: 'subselect',
        label: 'Sub-Select component',
        options: ({ select }) =>
          select === 'Yes' && [
            { value: 'foo', text: 'I am Foo' },
            { value: 'bar', text: 'I am bar' },
          ],
      };
      const formData = {
        select: 'Yes',
        subselect: 'foo',
      };
      expect(formatData(SelectProps, formData)).toEqual({
        key: 'select',
        title: 'Select component',
        value: 'Yes',
      });
      expect(formatData(SubSelectProps, formData)).toEqual({
        key: 'subselect',
        title: 'Sub-Select component',
        value: 'I am Foo',
      });
    });

    it('should format "TextInput isMulti" properly', () => {
      const componentProps = {
        component: 'TextInput',
        name: 'text',
        label: 'Some_text',
        isMulti: true,
      };
      const formData = {
        text: ['i', 'm', 'multi', 'text'],
      };
      expect(formatData(componentProps, formData)).toMatchSnapshot();
    });
  });

  describe('getSectionObject', () => {
    it('should work properly', () => {
      const formSteps = [{ id: 'foo' }, { id: 'bar', isMulti: true }];
      const formData = { foo: '', bar: [1, 2, 3] };
      expect(getSectionObject(formSteps, formData)).toEqual({
        foo: false,
        'bar/1': false,
        'bar/2': false,
        'bar/3': false,
      });
    });
  });
});
