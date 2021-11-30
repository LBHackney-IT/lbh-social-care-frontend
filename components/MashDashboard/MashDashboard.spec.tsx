import { render, screen, fireEvent } from '@testing-library/react';
import {
  mockedMashReferral,
  mockedMashReferrals,
} from 'factories/mashReferral';
import { ReferralStage } from 'types';
import MashDashboard from './MashDashboard';

let tabType: string | undefined;
let confirmationType: string | undefined;
const mockedRouter = {
  query: { confirmation: confirmationType, tab: tabType },
  push: jest.fn(),
};

jest.mock('next/router', () => ({
  useRouter: () => mockedRouter,
}));

describe('MashDashboard', () => {
  const contactMashReferral = mockedMashReferral;
  contactMashReferral.stage = ReferralStage.CONTACT;
  mockedMashReferrals.push(contactMashReferral);
  const { contact, initial } = {
    contact: mockedMashReferrals.filter(
      (ref) => ref.stage === ReferralStage.CONTACT
    ),
    initial: mockedMashReferrals.filter(
      (ref) => ref.stage === ReferralStage.INITIAL
    ),
  };

  beforeEach(() => {
    mockedRouter.query.tab = undefined;
    mockedRouter.query.confirmation = undefined;
  });

  it('renders the dashboard default tab to be the contact tab', () => {
    render(<MashDashboard referrals={mockedMashReferrals} />);

    expect(
      screen.getByText(`Contact (${contact.length})`).parentElement?.className
    ).toContain('active');
  });

  it('selects the correct tab if the url query is updated', () => {
    mockedRouter.query.tab = 'initial-decision';
    render(<MashDashboard referrals={mockedMashReferrals} />);

    expect(
      screen.getByText(`Initial decision (${initial.length})`).parentElement
        ?.className
    ).toContain('active');
  });

  it('updates the selected tab when a tab is clicked on', async () => {
    mockedRouter.query.confirmation =
      '{"title":"test-title","test-key":"test-body"}';
    render(<MashDashboard referrals={mockedMashReferrals} />);

    expect(
      screen.getByText(`Contact (${contact.length})`).parentElement?.className
    ).toContain('active');

    fireEvent.click(screen.getByText(`Initial decision (${initial.length})`));

    expect(
      screen.getByText(`Initial decision (${initial.length})`).parentElement
        ?.className
    ).toContain('active');
    expect(mockedRouter.push).toHaveBeenCalledWith(
      expect.objectContaining({
        query: { tab: 'initial-decision', confirmation: undefined },
      })
    );
  });

  it('shows the SuccessSummary component once a referral moves between stages', () => {
    mockedRouter.query.tab = 'contact';
    mockedRouter.query.confirmation =
      '{"title":"test-title","test-key":"test-body"}';
    render(<MashDashboard referrals={mockedMashReferrals} />);

    expect(screen.getByRole('alert'));
    expect(screen.getByText('test-title'));
    expect(screen.getByText('test-key - test-body'));
  });
});
