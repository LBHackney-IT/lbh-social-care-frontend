import { Factory } from 'fishery';
import { MashReferral, MashResident, ReferralStage } from 'types';
import { mockedWorker } from './workers';

const mashReferralResidentFactory = Factory.define<MashResident>(
  ({ sequence }) => ({
    id: sequence,
    firstName: 'resident-first-name',
    lastName: 'resident-last-name',
    dateOfBirth: '2021-12-09T23:37:20.603Z',
    gender: 'resident-gender',
    ethnicity: 'resident-ethnicity',
    firstLanguage: 'resident-first-language',
    school: 'resident-school',
    address: 'resident-address',
    postcode: 'resident-postcode',
  })
);

export const mashReferralFactory = Factory.define<MashReferral>(
  ({ sequence }) => ({
    id: sequence,
    referrer: 'hardcoded-referrer',
    requestedSupport: 'test-requested-support',
    assignedTo: mockedWorker,
    referralCreatedAt: '2021-10-27T09:32:17.319Z',
    mashResidents: [mashReferralResidentFactory.build()],
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
