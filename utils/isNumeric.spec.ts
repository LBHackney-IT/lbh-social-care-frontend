import { isNumeric } from './isNumeric';

describe('isNumeric utility checks input value', () => {
  it('should return true when input is a numeric string value', () => {
    const input = '100';
    expect(isNumeric(input)).toBe(true);
  });

  it('should return false when input contains numeric string and non numeric string value ', () => {
    const input = '100b';
    expect(isNumeric(input)).toBe(false);
  });

  it('should return false when input contains non numeric string value ', () => {
    const input = 'One Hundred';
    expect(isNumeric(input)).toBe(false);
  });
});
