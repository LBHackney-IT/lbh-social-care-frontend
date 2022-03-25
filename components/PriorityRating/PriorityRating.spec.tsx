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
    expect(getRatingColour('purple')).toBe('purple');
    expect(getRatingColour('red')).toBe('red');
    expect(getRatingColour('amber')).toBe('orange');
    expect(getRatingColour('green')).toBe('green');
    expect(getRatingColour('white')).toBe('grey');
  });

  it('properly convert ragRatings to string', () => {
    expect(getRatingString('purple')).toBe('Urgent');
    expect(getRatingString('red')).toBe('High');
    expect(getRatingString('amber')).toBe('Medium');
    expect(getRatingString('green')).toBe('Low');
    expect(getRatingString('white')).toBe('No priority');
  });
});
