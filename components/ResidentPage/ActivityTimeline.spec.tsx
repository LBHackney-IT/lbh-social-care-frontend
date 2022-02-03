import { render, screen } from '@testing-library/react';
import ActivityTimeline from './ActivityTimeline';
import { useCases } from 'utils/api/cases';
import { mockedCaseNote } from 'factories/cases';

jest.mock('utils/api/cases');

describe('ActivityTimeline', () => {
  it('shows nothing if there are no cases to show', () => {
    (useCases as jest.Mock).mockReturnValue({
      data: [{}],
    });

    render(<ActivityTimeline socialCareId={1} />);

    expect(screen.queryByText('Activity')).toBeNull();
  });

  it('shows three most recent activity events', () => {
    (useCases as jest.Mock).mockReturnValue({
      data: [
        {
          cases: [
            { ...mockedCaseNote, recordId: '1' },
            { ...mockedCaseNote, recordId: '2' },
            { ...mockedCaseNote, recordId: '3' },
            { ...mockedCaseNote, recordId: '4' },
          ],
        },
      ],
    });

    render(<ActivityTimeline socialCareId={1} />);

    expect(screen.getByRole('list'));
    expect(screen.getAllByRole('listitem').length).toBe(3);
  });
});
