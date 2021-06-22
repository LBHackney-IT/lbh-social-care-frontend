import {
  generateFlexibleSchema,
  validateConditionalFields,
} from './validators';

describe('generateFlexibleSchema', () => {
  it('handles different field types', async () => {
    const schema = generateFlexibleSchema([
      {
        question: 'foo',
        id: 'one',
        type: 'text',
      },
      {
        question: 'foo',
        id: 'two',
        type: 'textarea',
      },
      {
        question: 'foo',
        id: 'three',
        type: 'checkboxes',
      },
      {
        question: 'foo',
        id: 'four',
        type: 'repeater',
      },
      {
        question: 'foo',
        id: 'five',
        type: 'select',
      },
      {
        question: 'foo',
        id: 'six',
        type: 'radios',
      },
    ]);

    const result = await schema.validate({
      one: 'value',
      two: 'value',
      three: ['example', 'example 2'],
      four: ['example', 'example 2'],
      five: 'value',
      six: 'value',
    });

    expect(result).toBeTruthy();
  });

  it('handles required fields', async () => {
    const schema = generateFlexibleSchema([
      {
        id: 'one',
        question: 'foo',
        type: 'text',
        required: true,
      },
    ]);

    await expect(
      schema.validate({
        one: 'bar',
      })
    ).toBeTruthy();

    await expect(
      schema.validate({
        one: '',
      })
    ).rejects.toThrow();

    const schema2 = generateFlexibleSchema([
      {
        id: 'one',
        question: 'foo',
        type: 'checkboxes',
        required: true,
      },
    ]);

    await expect(
      schema2.validate({
        one: [],
      })
    ).rejects.toThrow();
  });

  it('handles custom error messages', async () => {
    const schema = generateFlexibleSchema([
      {
        id: 'one',
        question: 'foo',
        type: 'text',
        required: true,
        error: 'Example error message',
      },
    ]);

    await expect(
      schema.validate({
        one: '',
      })
    ).rejects.toThrowError('Example error message');
  });

  it('can be used recursively for repeater groups', async () => {
    const schema = generateFlexibleSchema([
      {
        question: 'foo',
        id: 'foo',
        type: 'repeaterGroup',
        required: true,
        subfields: [
          {
            id: 'bar',
            question: 'bar',
            type: 'text',
            required: true,
          },
        ],
      },
    ]);

    await expect(
      schema.validate({
        foo: [],
      })
    ).rejects.toThrowError('Add at least one item');

    await expect(
      schema.validate({
        foo: [
          {
            bar: '',
          },
        ],
      })
    ).rejects.toThrowError('This question is required');
  });
});

describe('validateConditionalFields', () => {
  it('validates required fields when the condition is met', () => {
    const result = validateConditionalFields(
      {
        foo: 'my-value',
      },
      [
        {
          id: 'one',
          type: 'text',
          question: '',
          required: true,
          condition: {
            id: 'foo',
            value: 'my-value',
          },
        },
        {
          id: 'two',
          type: 'checkboxes',
          question: '',
          required: true,
          condition: {
            id: 'foo',
            value: 'my-value',
          },
        },
        {
          id: 'three',
          type: 'repeater',
          question: '',
          required: true,
          condition: {
            id: 'foo',
            value: 'my-value',
          },
        },
      ]
    );
    expect(result).toMatchObject({
      one: 'This question is required',
      two: 'Choose at least one item',
      three: 'Add at least one item',
    });
  });

  it('does nothing when the condition is not met', () => {
    const result = validateConditionalFields({}, [
      {
        id: 'foo',
        type: 'text',
        question: 'Foo',
        required: true,
        condition: {
          id: 'bar',
          value: 'my-value',
        },
      },
    ]);
    expect(result).toMatchObject({});
  });
});
