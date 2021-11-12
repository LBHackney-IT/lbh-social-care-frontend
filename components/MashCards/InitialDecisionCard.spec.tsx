import { render, screen } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import InitialDecisionCard from './InitialDecisionCard';

describe('InitialDecisionCard', () => {
  it('renders the right info from the mash referral', () => {
    render(
      <InitialDecisionCard
        filter="initial-decision"
        mashReferral={mockedMashReferral}
      />
    );

    expect(screen.getByText('4 hours left'));
    expect(screen.getByText(`${mockedMashReferral.clients[0]} (referral)`));
    expect(screen.getByText(mockedMashReferral.requestedSupport as string));
    expect(screen.getByText('Make decision'));
    expect(screen.getByText('Assign'));
  });
});
