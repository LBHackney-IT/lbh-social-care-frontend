import { render, screen } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import MashCard from './MashCard';

describe('MashCard', () => {
  it('renders the right info from the mash referral', () => {
    render(
      <MashCard
        clientname={mockedMashReferral.clients[0]}
        timeleft="4 hours"
        datetime={mockedMashReferral.createdAt}
        info1={mockedMashReferral.initialDecision as string}
        info2={mockedMashReferral.initialReferralCategory as string}
      />
    );

    expect(screen.getByText('4 hours left'));
    expect(screen.getByText(`${mockedMashReferral.clients[0]} (referral)`));
    expect(screen.getByText(mockedMashReferral.initialDecision as string));
    expect(
      screen.getByText(mockedMashReferral.initialReferralCategory as string)
    );
  });
});
