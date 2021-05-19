import { truncate, groupByTheme } from './utils';

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
