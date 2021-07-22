import { populateChildForm } from './populate';

describe('populate', () => {
  it('fills a case note form right', () => {
    const result = populateChildForm(
      '1',
      '2',
      3,
      '4',
      'example.com/1FAIpQLSchNVVlwgQwwMHNdmweNPSZUtvKt0hOXFi9lj8na3F-MknFyw'
    );
    expect(result).toBe(
      '?entry.91559572=1 2&entry.323945892=3&entry.824752118=4'
    );
  });

  it('fills other forms right', () => {
    const result = populateChildForm('1', '2', 3, '4', 'example.com');
    expect(result).toBe(
      '?entry.323945892=3&entry.91559572=1&entry.1999530701=2&entry.432615953=1&entry.809765129=2&entry.1802043044=3&entry.787982027=1&entry.926422462=2&entry.2022397649=3&entry.529016216=4&entry.360061230=4'
    );
  });
});
