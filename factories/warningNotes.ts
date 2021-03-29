import { Factory } from 'fishery';

import { WarningNote } from 'types';

export const warningNoteFactory = Factory.define<WarningNote>(
  ({ sequence }) => ({
    id: sequence,
    type: 'Risk to Staff',
    createdDate: new Date(2020, 11, 22),
    createdBy: 'Foo',
    disclosedWithIndividual: 'No',
    undisclosedDetails: 'nope',
    discussedWithManager: 'the big boss',
    discussedWithManagerDate: new Date(2020, 11, 12),
    nextReviewDate: new Date(2021, 1, 1),
    notes: 'a lot to talk about',
    status: 'open',
    reviews: [],
  })
);

export const mockedWarningNote = [
  warningNoteFactory.build({
    type: 'Risk to Adults',
    reviewedDate: new Date(2020, 11, 13),
    reviewedBy: 'Bar',
    disclosedDate: new Date(2020, 11, 12),
    disclosedHow: ['written'],
    disclosedWithIndividual: 'Yes',
    disclosedDetails: 'lorem ipsum',
    nextReviewDate: new Date(2020, 11, 31),
    notes: 'i am a note',
  }),
  warningNoteFactory.build(),
];
