import { FlexibleAnswers } from 'data/flexibleForms/forms.types';

export enum WorkflowType {
  Assessment = 'Assessment',
  Review = 'Review',
  Reassessment = 'Reassessment',
  Historic = 'Historic',
}

export type Workflow = {
  id: string;
  type: WorkflowType;
  formId: string;
  answers: FlexibleAnswers;
  socialCareId: string;
  heldAt?: Date;
  teamAssignedTo?: string;
  assignedTo?: string;
  createdAt: string;
  createdBy: string;
  submittedAt?: Date;
  submittedBy?: string;
  managerApprovedAt?: Date;
  managerApprovedBy?: string;
  needsPanelApproval: boolean;
  panelApprovedAt?: Date;
  panelApprovedBy?: string;
  workflowId?: string;
  reviewBefore?: Date;
  linkToOriginal?: string;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
  acknowledgingTeam?: string;
  discardedAt?: Date;
  discardedBy?: string;
  updatedAt: Date;
  updatedBy?: string;
  episodeId?: string;
  form?: {
    id: string;
    name: string;
  };
  assignee?: {
    name: string;
    email: string;
  };
};
