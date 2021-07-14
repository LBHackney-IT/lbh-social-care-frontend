import { fireEvent, render, screen } from '@testing-library/react';
import {
  mockedAllocationNote,
  mockedCaseNote,
  mockedNote,
  mockedWarningNoteCase,
} from 'factories/cases';
import { mockSubmission } from 'factories/submissions';
import PersonTimeline from './PersonTimeline';

const mockEvents = [
  mockedNote,
  mockedCaseNote,
  mockedWarningNoteCase,
  mockedAllocationNote,
];

describe('PersonTimeline', () => {
  it('renders a list of clickable submissions', () => {
    render(
      <PersonTimeline
        setSize={jest.fn()}
        onLastPage={false}
        size={1}
        events={mockEvents}
      />
    );

    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getAllByRole('link').length).toBe(4);
    expect(screen.getByText('Showing 4 events over 9 months'));
    expect(screen.getByText('Load older events'));
  });

  it('hides the pagination button on the last page', () => {
    render(
      <PersonTimeline
        setSize={jest.fn()}
        onLastPage={true}
        size={1}
        events={mockEvents}
      />
    );
    expect(screen.queryByText('Load older events')).toBeNull();
  });

  it('can load older events', () => {
    const mockHandler = jest.fn();
    render(
      <PersonTimeline
        setSize={mockHandler}
        onLastPage={false}
        size={1}
        events={mockEvents}
      />
    );
    fireEvent.click(screen.getByText('Load older events'));
    expect(mockHandler).toBeCalledWith(2);
  });

  it('can show unfinished submissions', () => {
    render(
      <PersonTimeline
        setSize={jest.fn()}
        onLastPage={false}
        size={1}
        events={mockEvents}
        unfinishedSubmissions={[mockSubmission]}
      />
    );
    expect(screen.getByText('Unfinished submissions'));
    expect(screen.getAllByRole('listitem').length).toBe(6);
  });

  it('allows events to be searched', () => {
    render(
      <PersonTimeline
        setSize={jest.fn()}
        onLastPage={false}
        size={1}
        events={mockEvents}
      />
    );
    fireEvent.change(
      screen.getByLabelText('Search for matching events and records'),
      { target: { value: 'Warning' } }
    );
    expect(screen.getByText('Showing 1 event', { exact: false }));
    expect(screen.getAllByRole('listitem').length).toBe(1);
  });
});
