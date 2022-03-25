import { render, screen } from '@testing-library/react';
import PriorityRating, {
  getRatingString,
  getRatingColour,
} from './PriorityRating';
import { mockedAllocation } from 'factories/allocatedWorkers';
import { mockedResident } from 'factories/residents';

describe('PriorityRating', () => {
  it('renders correctly the element', () => {
    render(
      <PriorityRating allocation={mockedAllocation} resident={mockedResident} />
    );

    expect(screen.getByTestId('colourdot')).not.toBeNull();

    expect(screen.getByText('Medium'));
    expect(screen.getByText('Edit'));
  });

  it('properly convert ragRatings to CSS colours', () => {
    expect(getRatingColour('urgent')).toBe('purple');
    expect(getRatingColour('high')).toBe('red');
    expect(getRatingColour('medium')).toBe('orange');
    expect(getRatingColour('low')).toBe('green');
    expect(getRatingColour('none')).toBe('grey');
  });

  it('properly convert ragRatings to string', () => {
    expect(getRatingString('urgent')).toBe('Urgent');
    expect(getRatingString('high')).toBe('High');
    expect(getRatingString('medium')).toBe('Medium');
    expect(getRatingString('low')).toBe('Low');
    expect(getRatingString('none')).toBe('No priority');
  });
});
