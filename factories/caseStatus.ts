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
    answers: [mockedStatusField.build()],
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
  option: 'placementType',
  value: 'C1',
  startDate: '2020-08-01',
  createdAt: '2021-10-11T10:54:32Z',
}));

export const mockedFieldsFactory = Factory.define<FormOption>(() => ({
  name: 'N0',
  description: 'Not stated',
}));
