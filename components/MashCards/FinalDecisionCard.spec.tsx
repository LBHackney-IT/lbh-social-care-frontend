import { render, screen } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import FinalDecisionCard from './FinalDecisionCard';

describe('FinalDecisionCard', () => {
  it('renders the right info from the mash referral', () => {
    render(<FinalDecisionCard mashReferral={mockedMashReferral} />);

    expect(screen.getByText('4 hours left'));
    expect(screen.getByText(`${mockedMashReferral.clients[0]} (referral)`));
    expect(screen.getByText(mockedMashReferral.screeningDecision as string));
    expect(screen.getByText(mockedMashReferral.referralCategory as string));
    expect(screen.getByText('Make decision'));
    expect(screen.getByText('Assign'));
  });
});
