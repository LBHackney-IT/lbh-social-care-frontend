import { render, screen } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import ContactCard from './ContactCard';

describe('ContactCard', () => {
  it('renders the right info from the mash referral', () => {
    render(<ContactCard mashReferral={mockedMashReferral} />);

    expect(screen.getByText('4 hours left'));
    expect(screen.getByText(`${mockedMashReferral.clients[0]} (referral)`));
    expect(screen.getByText(mockedMashReferral.referrer as string));
    expect(screen.getByText(mockedMashReferral.requestedSupport as string));
    expect(screen.getByText('Work on'));
  });
});
