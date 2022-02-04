import { Workflow, WorkflowType } from 'components/ResidentPage/types';

export const mockWorkflow: Workflow = {
  id: '123abc',
  type: WorkflowType.Assessment,
  formId: 'mock-form',
  createdAt: '2020-10-10',
  createdBy: 'foo.bar@hackney.gov.uk',
  assignedTo: 'foo.bar@hackney.gov.uk',
  teamAssignedTo: 'foo',
  updatedAt: new Date(
    'October 13, 2020 14:00:00'
  ).toISOString() as unknown as Date,
  updatedBy: 'foo.bar@hackney.gov.uk',
  answers: {},
  socialCareId: '123',
  needsPanelApproval: true,
};
