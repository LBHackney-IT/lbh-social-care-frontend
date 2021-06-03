import { Factory } from 'fishery';

import { WarningNote } from 'types';

export const warningNoteFactory = Factory.define<WarningNote>(
  ({ sequence }) => ({
    id: sequence,
    noteType: 'Risk to Staff',
    startDate: '2020-11-22',
    createdBy: 'Foo',
    disclosedWithIndividual: false,
    undisclosedDetails: 'nope',
    managerName: 'the big boss',
    discussedWithManagerDate: '2020-11-12',
    reviewDate: '2021-1-1',
    notes: 'a lot to talk about',
    status: 'open',
    warningNoteReviews: [],
  })
);

export const mockedWarningNote = [
  warningNoteFactory.build({
    noteType: 'Risk to Adults',
    reviewedDate: '2020-11-13',
    reviewedBy: 'Bar',
    disclosedDate: '2020-11-12',
    disclosedHow: 'Written',
    disclosedWithIndividual: true,
    disclosedDetails: 'lorem ipsum',
    reviewDate: '2020-11-31',
    notes: 'i am a note',
  }),
  warningNoteFactory.build(),
];
