import { Resident } from 'types';
import {
  truncate,
  groupByTheme,
  pushUnique,
  generateInitialValues,
} from './utils';

describe('truncate', () => {
  it('leaves short text unaltered', () => {
    expect(truncate('Example input', 2)).toBe('Example input');
  });
  it('truncates longer text', () => {
    expect(truncate('Example input example input', 2)).toBe('Example input...');
  });
});

const form = {
  id: '1',
  name: 'Example form',
  steps: [
    {
      id: '1',
      name: 'First example step',
      fields: [],
      theme: 'First theme',
    },
    {
      id: '2',
      name: 'Second example step',
      fields: [],
      theme: 'First theme',
    },
    {
      id: '3',
      name: 'Second example step',
      fields: [],
      theme: 'Second theme',
    },
  ],
};

describe('groupByTheme', () => {
  it('themes things correctly', () => {
    const result = groupByTheme(form);
    expect(result[0].name).toEqual('First theme');
    expect(result[0].steps.length).toEqual(2);
    expect(result[1].name).toEqual('Second theme');
    expect(result[1].steps.length).toEqual(1);
  });
});

describe('pushUnique', () => {
  it('removes duplicates', () => {
    const result = pushUnique(['one', 'two', 'three', 'three'], 'three');
    expect(result).toEqual(['one', 'two', 'three']);
  });

  it('leaves arrays without duplicates alone', () => {
    const result = pushUnique(['one', 'two', 'three', 'four'], 'five');
    expect(result).toEqual(['one', 'two', 'three', 'four', 'five']);
  });
});

describe('generateInitialValues', () => {
  it('correctly handles different field types', () => {
    const result = generateInitialValues(
      [
        {
          id: 'one',
          question: '',
          type: 'text',
        },
        {
          id: 'two',
          question: '',
          type: 'checkboxes',
        },
        {
          id: 'three',
          question: '',
          type: 'repeater',
        },
        {
          id: 'four',
          question: '',
          type: 'file',
        },
        {
          id: 'five',
          question: '',
          type: 'select',
          choices: [
            {
              value: 'blah',
              label: '',
            },
          ],
        },
      ],
      undefined
    );

    expect(result).toMatchObject({
      one: '',
      two: [],
      three: [],
      four: null,
      five: 'blah',
    });
  });

  it("prefills if there's data available", () => {
    const result = generateInitialValues(
      [
        {
          id: 'foo',
          question: '',
          type: 'text',
          prefill: 'one' as keyof Resident,
        },
        {
          id: 'bar',
          question: '',
          type: 'select',
          prefill: 'one' as keyof Resident,
        },
        {
          id: 'su',
          question: '',
          type: 'text',
          prefill: 'two' as keyof Resident,
        },
      ],
      { one: 'example value' } as unknown as Resident
    );

    expect(result).toMatchObject({
      foo: 'example value',
      bar: 'example value',
      su: '',
    });
  });
});
