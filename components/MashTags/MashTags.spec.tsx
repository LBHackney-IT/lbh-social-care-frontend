import { render, screen } from '@testing-library/react';
import MashTags from './MashTags';
import { mashReferralFactory } from 'factories/mashReferral';
import { ReferralStage } from 'types';
import MockDate from 'mockdate';
import { subHours } from 'date-fns';

describe('MashTags', () => {
  beforeEach(() => {
    MockDate.reset();
  });
  it('should show time since referral was recieved when the referral is in contact stage', () => {
    MockDate.set('2021-01-01');
    const contactMockReferral = mashReferralFactory.build({
      stage: ReferralStage.CONTACT,
      createdAt: subHours(new Date(), 2).toISOString(),
    });

    render(<MashTags mashReferral={contactMockReferral} />);

    expect(screen.getByText('2 hours ago'));
  });
});
