import ActivityPage from 'pages/residents/[id]/activity';
import { render, screen } from '@testing-library/react';
import { mockedResident } from 'factories/residents';
import { useCases } from 'utils/api/cases';
import { AppConfigProvider } from 'lib/appConfig';

import { mockedCaseNote } from 'factories/cases';
jest.mock('utils/api/cases');

describe('ActivityPage', () => {
  it('correctly renders a list of activity', () => {
    (useCases as jest.Mock).mockReturnValue({
      data: [
        {
          cases: [
            mockedCaseNote,
            {
              ...mockedCaseNote,
              recordId: '2',
            },
            {
              ...mockedCaseNote,
              recordId: '3',
            },
          ],
        },
      ],
    });

    render(
      <AppConfigProvider appConfig={{}}>
        <ActivityPage resident={mockedResident} />
      </AppConfigProvider>
    );

    expect(screen.getByRole('table'));
    expect(screen.getAllByRole('row').length).toBe(4);
    expect(screen.getAllByRole('link').length).toBe(3);
  });
});

describe('ActivityPage', () => {
  it('correctly renders a long list of activity - adding load more button with cursor', () => {
    (useCases as jest.Mock).mockReturnValue({
      data: [
        {
          cases: [
            mockedCaseNote,
            {
              ...mockedCaseNote,
              recordId: '2',
            },
            {
              ...mockedCaseNote,
              recordId: '3',
            },
          ],
          nextCursor: 123,
        },
      ],
    });

    render(
      <AppConfigProvider appConfig={{}}>
        <ActivityPage resident={mockedResident} />
      </AppConfigProvider>
    );

    expect(screen.getByRole('table'));
    expect(screen.getAllByRole('row').length).toBe(4);
    expect(screen.getAllByRole('link').length).toBe(3);
    expect(screen.getByRole('button', { name: 'Load more' }));
  });
});
