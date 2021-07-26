import { generateFlexibleSchema, generateSubmitSchema } from './validators';

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
      {
        question: 'foo',
        id: 'seven',
        type: 'timetable',
      },
      {
        question: 'foo',
        id: 'eight',
        type: 'datetime',
      },
    ]);

    const result = await schema.validate({
      one: 'value',
      two: 'value',
      three: ['example', 'example 2'],
      four: ['example', 'example 2'],
      five: 'value',
      six: 'value',
      seven: {},
      eight: [],
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

    const schema3 = generateFlexibleSchema([
      {
        id: 'one',
        question: 'foo',
        type: 'timetable',
        required: true,
      },
    ]);

    await expect(
      schema3.validate({
        one: {
          Mon: {
            Morning: '0',
          },
        },
      })
    ).rejects.toThrow();

    const schema4 = generateFlexibleSchema([
      {
        id: 'one',
        question: 'foo',
        type: 'datetime',
        required: true,
      },
    ]);

    await expect(
      schema4.validate({
        one: ['test'],
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

describe('generateSubmitSchema', () => {
  it("doesn't allow the user to put themselves down as approver", async () => {
    const schema = generateSubmitSchema('foo@hackney.gov.uk');

    await expect(
      schema.validate({
        approverEmail: 'foo@hackney.gov.uk',
      })
    ).rejects.toThrowError(`You can't approve your own submissions`);
  });
});
