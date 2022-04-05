import { capitalize } from './strings';

describe('strings utils', () => {
  it('should capitalize correctly words', () => {
    expect(capitalize('this is a string')).toBe('This is a string');
    expect(capitalize('fooobar')).toBe('Fooobar');
  });
});
