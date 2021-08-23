import { Factory } from 'fishery';
import {
  CaseStatus,
  PersonCaseStatus,
  FormValue,
  FormFields,
  FormOption,
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
    startDate: '2021-01-01T02:00:00Z',
    endDate: '2021-12-01T02:00:00Z',
    notes: 'a lot to note',
  })
);

export const mockedFormValueFactory = Factory.define<FormFields>(() => ({
  fields: [mockedCaseStatusFormValueFactory.build()],
}));

export const mockedCaseStatusFormValueFactory = Factory.define<FormValue>(
  () => ({
    name: 'test',
    description: 'description',
    options: [mockedCaseStatusFormOptionFactory.build()],
  })
);

export const mockedCaseStatusFormOptionFactory = Factory.define<FormOption>(
  () => ({
    name: 'N1',
    description: 'Noo 1',
  })
);

export const mockedFormValue = [mockedFormValueFactory.build()];

const mockedStatusField = Factory.define<CaseStatusFields>(() => ({
  name: 'placementReason',
  description: 'What is the primary reason for placement? (Primary need code)',
  selectedOption: mockedFieldsFactory.build(),
}));

const mockedFieldsFactory = Factory.define<FormOption>(() => ({
  name: 'N0',
  description: 'Not stated',
}));
