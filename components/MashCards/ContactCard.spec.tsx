import { render, screen } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import { mashReferralFactory } from 'factories/mashReferral';
import ContactCard from './ContactCard';

describe('ContactCard', () => {
  it('renders the right info from the mash referral', () => {
    render(<ContactCard mashReferral={mockedMashReferral} />);
    expect(
      screen.getByText(`${mockedMashReferral.clients[0]}`, { exact: false })
    );
    expect(screen.getByText(mockedMashReferral.referrer as string));
    expect(screen.getByText(mockedMashReferral.requestedSupport as string));
    expect(screen.getByText('Work on'));
  });
  it('renders the high priority banner when the referral is high priority and it is a red RAG rating', () => {
    const priorityMockReferral = mashReferralFactory.build({
      referrer: 'Police - red',
    });
    render(<ContactCard mashReferral={priorityMockReferral} />);
    expect(screen.getByText('High priority'));
    expect(
      screen.getByText(`${priorityMockReferral.clients[0]}`, { exact: false })
    );
    expect(screen.getByText(priorityMockReferral.referrer as string));
    expect(screen.getByText(priorityMockReferral.requestedSupport as string));
    expect(screen.getByText('Work on'));
  });
  it('renders the high priority banner when the referral is high priority and it is a amber RAG rating', () => {
    const priorityMockReferral = mashReferralFactory.build({
      referrer: 'Police - amber',
    });
    render(<ContactCard mashReferral={priorityMockReferral} />);
    expect(screen.getByText('High priority'));
    expect(
      screen.getByText(`${priorityMockReferral.clients[0]}`, { exact: false })
    );
    expect(screen.getByText(priorityMockReferral.referrer as string));
    expect(screen.getByText(priorityMockReferral.requestedSupport as string));
    expect(screen.getByText('Work on'));
  });
});
