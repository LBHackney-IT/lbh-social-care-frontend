import { render, screen } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import FinalDecisionCard from './FinalDecisionCard';
import { format } from 'date-fns';

describe('FinalDecisionCard', () => {
  it('renders the right info from the mash referral', () => {
    render(<FinalDecisionCard mashReferral={mockedMashReferral} />);
    expect(
      screen.getByText(`submitted{' '}
    ${format(new Date(mockedMashReferral.createdAt), 'HH:00 dd MMM')}`)
    );
    expect(screen.getByText(`${mockedMashReferral.clients[0]} (referral)`));
    expect(screen.getByText(mockedMashReferral.screeningDecision as string));
    expect(
      screen.getByText(mockedMashReferral.initialReferralCategory as string)
    );
    expect(screen.getByText('Make decision'));
    expect(screen.getByText('Assign'));
    expect(screen.getByText('Name of client'));
    expect(screen.getByText('Referral category'));
    expect(screen.getByText('Screening decision'));
  });
});
