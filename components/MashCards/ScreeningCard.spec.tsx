import { render, screen } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import ScreeningCard from './ScreeningCard';
import { format } from 'date-fns';

describe('ScreeningCard', () => {
  it('renders the right info from the mash referral', () => {
    render(<ScreeningCard mashReferral={mockedMashReferral} />);

    expect(
      screen.getByText(`submitted{' '}
    ${format(new Date(mockedMashReferral.createdAt), 'HH:00 dd MMM')}`)
    );
    expect(screen.getByText(`${mockedMashReferral.clients[0]} (referral)`));
    expect(screen.getByText(mockedMashReferral.initialDecision as string));
    expect(screen.getByText(mockedMashReferral.referralCategory as string));
    expect(screen.getByText('Make decision'));
    expect(screen.getByText('Assign'));
    expect(screen.getByText('Name of client'));
    expect(screen.getByText('Initial decision'));
    expect(screen.getByText('Referral category'));
  });
});
