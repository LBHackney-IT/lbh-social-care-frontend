import { userFactory } from '../factories/users';
import { getAuditingParams } from './auditing';

describe('#getAuditingParams()', () => {
  it('should return the user email and activate auditing if the user has the isAuditable flag set to true', () => {
    const user = userFactory.build({
      email: 'first.last@hackney.gov.uk',
      isAuditable: true,
    });

    expect(getAuditingParams(user)).toEqual({
      userId: 'first.last@hackney.gov.uk',
      auditingEnabled: true,
    });
  });

  it('should return an undefined email and inactive auditing if the user has the isAuditable flag set to false', () => {
    const user = userFactory.build({
      email: 'first.last.@hackney.gov.uk',
      isAuditable: false,
    });

    expect(getAuditingParams(user)).toEqual({
      userId: undefined,
      auditingEnabled: false,
    });
  });
});
