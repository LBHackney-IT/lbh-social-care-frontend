import { Factory } from 'fishery';
import {
  CaseStatus,
  CaseStatusFields,
  AddCaseStatusFormData,
  CaseStatusAnswerDisplay,
} from 'types';

export const mockedCaseStatusFactory = Factory.define<CaseStatus>(
  ({ sequence }) => ({
    id: sequence,
    type: 'CP',
    answers: [mockedStatusField.build()],
    startDate: '2021-01-01T02:00:00Z',
    endDate: '',
    notes: '',
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

export const mockedStatusField = Factory.define<CaseStatusFields>(() => ({
  option: 'category',
  value: 'C1',
  startDate: '2020-08-01',
  createdAt: '2021-10-11T10:54:32Z',
  groupId: 'abcd',
}));

export const mockedCaseStatusAnswers = Factory.define<CaseStatusAnswerDisplay>(
  () => ({
    startDate: '2021-09-10',
    endDate: '2021-10-10',
    status: [mockedStatusField.build()],
  })
);
