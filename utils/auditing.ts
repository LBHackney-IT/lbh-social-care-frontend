import { User } from '../types';

export const getAuditingParams = (
  user: User
): {
  userId?: string;
  auditingEnabled: boolean;
} => {
  return {
    userId: user.isAuditable ? user.email : undefined,
    auditingEnabled: user.isAuditable,
  };
};
