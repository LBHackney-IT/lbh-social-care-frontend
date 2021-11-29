import { render, screen } from '@testing-library/react';
import Heading from './Heading';
import { mockedMashReferral } from 'factories/mashReferral';
import { format } from 'date-fns';

describe('Heading', () => {
  it('renders a title', () => {
    render(<Heading mashReferral={mockedMashReferral} />);
    expect(
      screen.getByText(
        `received at ${format(
          new Date(mockedMashReferral.createdAt),
          'HH:00 dd MMM'
        )}`
      )
    );
    expect(screen.getByText(mockedMashReferral.clients[0] as string));
  });
});
