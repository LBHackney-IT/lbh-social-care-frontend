import { Factory } from 'fishery';
import {
  CaseStatus,
  PersonCaseStatus,
  FormValue,
  FormStatusValue,
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

export const mockedFormValueFactory = Factory.define<FormValue>(() => ({
  name: 'test',
  description: 'description',
  options: [mockedFormStatusValueFactory.build()],
}));

export const mockedFormStatusValueFactory = Factory.define<FormStatusValue>(
  () => ({
    name: 'N1',
    description: 'Noo 1',
  })
);

export const mockedFormValue = [mockedFormValueFactory.build()];
