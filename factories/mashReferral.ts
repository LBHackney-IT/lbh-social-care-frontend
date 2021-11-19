import { Factory } from 'fishery';
import { MashReferral, ReferralStage } from 'types';
import { mockedWorker } from './workers';

export const mashReferralFactory = Factory.define<MashReferral>(
  ({ sequence }) => ({
    id: sequence.toString(),
    referrer: 'hardcoded-referrer',
    requestedSupport: 'test-requested-support',
    assignedTo: mockedWorker,
    createdAt: '2021-10-27T09:32:17.319Z',
    clients: ['test-client'],
    referralDocumentURI: 'test-referral-document-URI',
    stage: ReferralStage.INITIAL,
    contactUrgentContactRequired: false,
    contactCreatedAt: '2021-10-28T10:55:45.097Z',
    initialReferralCategory: 'test-referral-category',
    initialDecision: 'test-initial-decision',
    initialUrgentContactRequired: false,
    initialCreatedAt: '2021-11-01T15:12:05.097Z',
    screeningDecision: 'test-screening-decision',
    screeningUrgentContactRequired: false,
    screeningCreatedAt: '2021-11-03T18:52:05.097Z',
    finalDecision: 'test-final-decision',
    finalReferralCategory: 'test-final-referral-category',
    finalUrgentContactRequired: false,
    finalCreatedAt: '2021-11-18T15:10:05.097Z',
  })
);

export const mockedMashReferral = mashReferralFactory.build();
export const mockedMashReferrals = [mashReferralFactory.build()];
