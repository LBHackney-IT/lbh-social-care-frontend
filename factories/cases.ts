import { Factory } from 'fishery';

import { Case } from 'types';

const caseFactory = Factory.define<Case>(({ sequence }) => ({
  recordId: sequence.toString(),
  personId: 123,
  dateOfEvent: '25/10/2020 13:49:43',
  formName: 'foorm',
  officerEmail: 'Fname.Lname@hackney.gov.uk',
  caseFormData: {
    note: 'I am the note',
    first_name: 'Foo',
    last_name: 'Bar',
    timestamp: '11/03/2021 16:51:56',
    mosaic_id: 123,
    form_name_overall: 'ASC_case_note',
    worker_email: 'worker@hackney.gov.uk',
    form_name: 'Foo bar',
    context_flag: 'A',
    date_of_event: '25/10/2020 13:49:43',
  },
}));

const allocationCaseFactory = caseFactory.params({
  formName: 'Worker allocated',
  caseFormUrl: undefined,
  caseFormData: {
    allocation_id: 321,
    created_by: 'foo@hackney.gov.uk',
    form_name_overall: 'API_Allocation',
    form_name: 'Worker allocated',
  },
});

const deallocationCaseFactory = caseFactory.params({
  formName: 'Worker allocated',
  caseFormUrl: undefined,
  caseFormData: {
    allocation_id: 321,
    created_by: 'foo@hackney.gov.uk',
    deallocation_reason: 'deallocated because',
    form_name_overall: 'API_Deallocation',
    form_name: 'Worker deallocated',
  },
});

export const mockedNote = caseFactory.build({ caseFormUrl: 'https://foo.bar' });
export const mockedAllocationNote = allocationCaseFactory.build();
export const mockedDeallocationNote = deallocationCaseFactory.build();
