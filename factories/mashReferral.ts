import { Factory } from 'fishery';
import { MashReferral, ReferralStage } from 'types';
import { mockedWorker } from './workers';

export const mashReferralFactory = Factory.define<MashReferral>(
  ({ sequence }) => ({
    id: sequence.toString(),
    referrer: 'hardcoded-referrer',
    assignedTo: mockedWorker,
    clients: ['test-client'],
    createdAt: '2021-10-27T09:32:17.319Z',
    stage: ReferralStage.INITIAL,
    requestedSupport: 'test-requested-support',
    finalDecision: 'test-final-decision',
    initialDecision: 'test-initial-decision',
    screeningDecision: 'test-screening-decision',
    screeningUrgentContactRequired: false,
    screeningCreatedAt: '2021-11-03T18:52:05.097Z',
    referralCategory: 'test-referral-category',
    referralDocumentURI: 'test-referral-document-URI',
  })
);

export const mockedMashReferral = mashReferralFactory.build();
