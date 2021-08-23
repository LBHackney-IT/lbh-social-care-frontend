import { Factory } from 'fishery';
import {
  CaseStatus,
  PersonCaseStatus,
  FieldOption,
  CaseStatusFields,
} from 'types';

export const mockedPersonCaseStatusFactory = Factory.define<PersonCaseStatus>(
  ({ sequence }) => ({
    personId: sequence,
    caseStatuses: [mockedCaseStatusFactory.build()],
  })
);

export const mockedCaseStatusFactory = Factory.define<CaseStatus>(
  ({ sequence }) => ({
    id: sequence,
    type: 'foo',
    fields: [mockedStatusField.build()],
    startDate: '2021-1-1',
    endDate: '2021-1-1',
    notes: 'a lot to note',
  })
);

const mockedStatusField = Factory.define<CaseStatusFields>(() => ({
  name: 'placementReason',
  description: 'What is the primary reason for placement? (Primary need code)',
  selectedOption: mockedFieldsFactory.build(),
}));

const mockedFieldsFactory = Factory.define<FieldOption>(() => ({
  name: 'N0',
  description: 'Not stated',
}));
