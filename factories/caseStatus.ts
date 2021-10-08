import { Factory } from 'fishery';
import {
  CaseStatus,
  FormValue,
  FormFields,
  FormOption,
  CaseStatusFields,
  AddCaseStatusFormData,
} from 'types';

export const mockedCaseStatusFactory = Factory.define<CaseStatus>(
  ({ sequence }) => ({
    id: sequence,
    type: 'CIN',
    fields: [mockedStatusField.build()],
    startDate: '2021-01-01T02:00:00Z',
    endDate: '2021-12-01T02:00:00Z',
    notes: 'a lot to note',
  })
);

export const mockedCaseStatusAddRequest = Factory.define<AddCaseStatusFormData>(
  ({ sequence }) => ({
    personId: sequence,
    type: 'CIN',
    fields: [{ name: 'test', selected: 'test' }],
    startDate: '2021-01-01T02:00:00Z',
    endDate: '2021-12-01T02:00:00Z',
    notes: 'a lot to note',
    createdby: 'test@testington.com',
  })
);

export const mockedFormValueFactory = Factory.define<FormFields>(() => ({
  fields: [mockedCaseStatusFormValueFactory.build()],
}));

export const mockedCaseStatusFormValueFactory = Factory.define<FormValue>(
  () => ({
    name: 'test',
    description: 'description',
    options: [mockedFieldsFactory.build()],
  })
);

export const mockedStatusField = Factory.define<CaseStatusFields>(() => ({
  name: 'placementReason',
  description: 'What is the primary reason for placement? (Primary need code)',
  selectedOption: mockedFieldsFactory.build(),
}));

export const mockedFieldsFactory = Factory.define<FormOption>(() => ({
  name: 'N0',
  description: 'Not stated',
}));
