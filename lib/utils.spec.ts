import { truncate } from './utils';

describe('truncate', () => {
  it('leaves short text unaltered', () => {
    expect(truncate('Example input', 2)).toBe('Example input');
  });
  it('truncates longer text', () => {
    expect(truncate('Example input example input', 2)).toBe('Example input...');
  });
});
