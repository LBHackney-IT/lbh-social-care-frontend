import { render, screen } from '@testing-library/react';
import { mockedCaseNote } from 'factories/cases';
import CaseNoteTile from './CaseNoteTile';

import { useWorker } from 'utils/api/workers';
import { mockedWorker } from 'factories/workers';

jest.mock('utils/api/workers');

(useWorker as jest.Mock).mockReturnValue({ data: [mockedWorker] });

describe('CaseNoteTile', () => {
  it('shows basic case note information', () => {
    render(<CaseNoteTile c={mockedCaseNote} />);

    expect(screen.getByText('25 Oct 2020'));
    expect(screen.getByText('foorm'));
    expect(screen.getByText('By Foo Bar'));
  });

  it('links to case note', () => {
    render(<CaseNoteTile c={mockedCaseNote} />);

    expect((screen.getByRole('link') as HTMLAnchorElement).href).toContain(
      '/people/123/records/4'
    );
  });
});
