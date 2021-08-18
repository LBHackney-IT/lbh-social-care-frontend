import { Factory } from 'fishery';
import {
  CaseStatus,
  PersonCaseStatus,
  CaseStatusFormValue,
  CaseStatusFormOption,
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
    subType: 'bar',
    StartDate: '2021-1-1',
    EndDate: '2021-1-1',
    Notes: 'a lot to note',
  })
);

export const mockedFormValueFactory = Factory.define<CaseStatusFields>(() => ({
  fields: [mockedCaseStatusFormValueFactory.build()],
}));

export const mockedCaseStatusFormValueFactory =
  Factory.define<CaseStatusFormValue>(() => ({
    name: 'test',
    description: 'description',
    options: [mockedCaseStatusFormOptionFactory.build()],
  }));

export const mockedCaseStatusFormOptionFactory =
  Factory.define<CaseStatusFormOption>(() => ({
    name: 'N1',
    description: 'Noo 1',
  }));

export const mockedFormValue = [mockedFormValueFactory.build()];
