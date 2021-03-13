import { AllocationCaseFormData, Case, DeallocationCaseFormData } from 'types';

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
