import { Factory } from 'fishery';
import { CaseStatus, CaseStatusFields, AddCaseStatusFormData } from 'types';

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

const mockedStatusField = Factory.define<CaseStatusFields>(() => ({
  option: 'placementReason',
  value: 'N0',
  startDate: '2021-09-01',
  createdAt: '2021-09-01',
}));
