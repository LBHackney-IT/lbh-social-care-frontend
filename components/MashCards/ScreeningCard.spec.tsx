import { render, screen } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import { mashReferralFactory } from 'factories/mashReferral';
import ScreeningCard from './ScreeningCard';
import { format } from 'date-fns';

describe('ScreeningCard', () => {
  it('renders the right info from the mash referral', () => {
    render(<ScreeningCard mashReferral={mockedMashReferral} />);
    expect(
      screen.getByText(
        `submitted ${format(
          new Date(mockedMashReferral.createdAt),
          'HH:00 dd MMM'
        )}`
      )
    );
    expect(screen.getByText(`${mockedMashReferral.clients[0]} (referral)`));
    expect(screen.getByText(mockedMashReferral.initialDecision as string));
    expect(
      screen.getByText(mockedMashReferral.initialReferralCategory as string)
    );
    expect(screen.getByText('Make decision'));
    expect(screen.getByText('Assign'));
    expect(screen.getByText('Name of client'));
    expect(screen.getByText('Initial decision'));
    expect(screen.getByText('Referral category'));
  });
  it('renders the right info from the mash referral', () => {
    const priorityMockReferral = mashReferralFactory.build({
      initialUrgentContactRequired: true,
    });
    render(<ScreeningCard mashReferral={priorityMockReferral} />);
    expect(screen.getByText('High priority'));
    expect(
      screen.getByText(
        `submitted ${format(
          new Date(priorityMockReferral.createdAt),
          'HH:00 dd MMM'
        )}`
      )
    );
    expect(screen.getByText(`${priorityMockReferral.clients[0]} (referral)`));
    expect(screen.getByText(priorityMockReferral.initialDecision as string));
    expect(
      screen.getByText(priorityMockReferral.initialReferralCategory as string)
    );
    expect(screen.getByText('Make decision'));
    expect(screen.getByText('Assign'));
    expect(screen.getByText('Name of client'));
    expect(screen.getByText('Initial decision'));
    expect(screen.getByText('Referral category'));
  });
});
