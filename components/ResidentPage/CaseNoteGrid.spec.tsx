import { fireEvent, render, screen } from '@testing-library/react';
import { mockedCaseNote } from 'factories/cases';
import { mockedResident } from 'factories/residents';
import CaseNoteGrid from './CaseNoteGrid';
import { useRouter } from 'next/router';

jest.mock('next/router');

(useRouter as jest.Mock).mockReturnValue({
  query: {},
});

const mockSetSize = jest.fn();

const mockCases = [
  { ...mockedCaseNote, recordId: '1' },
  { ...mockedCaseNote, recordId: '2' },
  { ...mockedCaseNote, recordId: '3' },
  { ...mockedCaseNote, recordId: '4' },
];

describe('CaseNoteGrid', () => {
  it('shows a list of case notes', () => {
    render(
      <CaseNoteGrid
        totalCount={4}
        resident={mockedResident}
        cases={mockCases}
        size={1}
        setSize={mockSetSize}
      />
    );
    expect(screen.getByRole('list'));
    expect(screen.getAllByRole('listitem').length).toBe(4);
    expect(screen.getAllByText('foorm').length).toBe(4);
  });

  it('can load earlier notes', () => {
    render(
      <CaseNoteGrid
        totalCount={8}
        resident={mockedResident}
        cases={mockCases}
        size={1}
        setSize={mockSetSize}
      />
    );
    expect(screen.getByText('Showing 4 of 8'));
    fireEvent.click(screen.getByText('Load more'));
    expect(mockSetSize).toBeCalledWith(2);
  });
});
