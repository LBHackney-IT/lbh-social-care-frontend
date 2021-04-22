import {
  AllocationCaseFormData,
  Case,
  HistoricCaseData,
  DeallocationCaseFormData,
  HistoricVisitData,
} from 'types';

export const mockedNote: Case = {
  recordId: '123',
  personId: 123,
  dateOfEvent: '25/10/2020 13:49:43',
  formName: 'foorm',
  caseFormUrl: 'https://foo.bar',
  officerEmail: 'Fname.Lname@hackney.gov.uk',
  caseFormData: {
    note: 'I am the note',
    first_name: 'Foo',
    last_name: 'Bar',
    timestamp: '11/03/2021 16:51:56',
    mosaic_id: 123,
    form_name_overall: 'foo',
    worker_email: 'worker@hackney.gov.uk',
    form_name: 'Foo bar',
    context_flag: 'A',
    date_of_event: '25/10/2020 13:49:43',
  },
};

export const mockedCaseNote: Case = {
  ...mockedNote,
  recordId: 'cn_123',
  caseFormData: {
    ...mockedNote.caseFormData,
    form_name_overall: 'ASC_case_note',
    case_note_title: 'i am a case title',
  },
};

export const mockedHistoricCaseNote: HistoricCaseData = {
  title: 'Foo',
  formName: 'Foo Bar',
  content: 'I am historic content',
  officerName: 'Foo Bar Bar',
  officerEmail: 'foo@hackney.gov.uk',
  dateOfEvent: '11/03/2021 16:51:56',
};

export const mockedHistoricVisitNote: HistoricVisitData = {
  visitId: 123,
  personId: 321,
  visitType: 'VIS.TYPE',
  plannedDateTime: '2019-12-12T13:00:00Z',
  actualDateTime: '2019-12-12T13:00:00Z',
  createdByName: 'Foo Bar',
  createdByEmail: 'foo.bar@Hackney.gov.uk',
  reasonNotPlanned: 'not planned because',
  reasonVisitNotMade: 'not made reason',
  seenAloneFlag: true,
  completedFlag: true,
};

export const mockedAllocationNote: Case = {
  recordId: 'r_123',
  formName: 'Worker allocated',
  personId: 123,
  firstName: 'Foo',
  lastName: 'Bar',
  officerEmail: 'foo@hackney.gov.uk',
  caseFormTimestamp: '11/03/2021 16:51:56',
  caseFormData: {
    note: 'I am the note',
    allocation_id: 321,
    created_by: 'foo@hackney.gov.uk',
    first_name: 'Foo',
    last_name: 'Bar',
    timestamp: '11/03/2021 16:51:56',
    mosaic_id: 123,
    worker_email: 'worker@hackney.gov.uk',
    form_name_overall: 'API_Allocation',
    form_name: 'Worker allocated',
  } as AllocationCaseFormData,
};

export const mockedDeallocationNote: Case = {
  recordId: 'r_123',
  formName: 'Worker allocated',
  personId: 123,
  firstName: 'Foo',
  lastName: 'Bar',
  officerEmail: 'foo@hackney.gov.uk',
  caseFormTimestamp: '11/03/2021 16:51:56',
  caseFormData: {
    note: 'I am the note',
    allocation_id: 321,
    deallocation_reason: 'deallocated because',
    created_by: 'foo@hackney.gov.uk',
    first_name: 'Foo',
    last_name: 'Bar',
    timestamp: '11/03/2021 16:51:56',
    mosaic_id: 123,
    worker_email: 'worker@hackney.gov.uk',
    form_name_overall: 'API_Deallocation',
    form_name: 'Worker deallocated',
  } as DeallocationCaseFormData,
};
