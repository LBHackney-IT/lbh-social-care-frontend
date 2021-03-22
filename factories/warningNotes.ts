import { Factory } from 'fishery';

import { WarningNote } from 'types';

const warningNoteFactory = Factory.define<WarningNote>(({ sequence }) => ({
  id: sequence,
  type: 'Risk to Staff',
  createdDate: new Date(2020, 11, 22),
  createdBy: 'Foo',
  disclosedWithIndividual: 'No',
  disclosedDetails: 'nope',
  discussedWithManager: 'the big boss',
  discussedWithManagerDate: new Date(2020, 11, 12),
  nextReviewDate: new Date(2021, 1, 1),
  notes: 'a lot to talk about',
  status: 'open',
  reviews: [],
}));

export const mockedWarningNote: WarningNote[] = [
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
