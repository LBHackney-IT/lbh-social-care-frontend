import { render, screen } from '@testing-library/react';
import PriorityRating, {
  getRatingString,
  getRatingColour,
} from './PriorityRating';
import {
  mockedAllocation,
  allocationFactory,
} from 'factories/allocatedWorkers';
import { mockedResident } from 'factories/residents';

describe('PriorityRating', () => {
  it('renders correctly the element', () => {
    render(
      <PriorityRating allocation={mockedAllocation} resident={mockedResident} />
    );

    expect(screen.getByTestId('colourdot')).not.toBeNull();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
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

  it('shows "no priority" and edit link in case a ragRating is not specified (legacy allocation)', () => {
    render(
      <PriorityRating
        allocation={allocationFactory.build({ ragRating: undefined })}
        resident={mockedResident}
      />
    );
    expect(screen.getByText('No priority')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
