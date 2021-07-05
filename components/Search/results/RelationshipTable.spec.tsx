import { render } from '@testing-library/react';

import RelationshipTable from './RelationshipTable';
import {
  legacyResidentFactory,
  mockedLegacyResident,
} from 'factories/residents';
import { UserContext } from '../../UserContext/UserContext';
import { mockedUser, userFactory } from '../../../factories/users';

describe('Relationshiptable component', () => {
  it('should render a list of residents', () => {
    const { asFragment } = render(
      <UserContext.Provider value={{ user: mockedUser }}>
        <RelationshipTable records={[mockedLegacyResident]} callback={null} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a resident without a postcode', () => {
    const { asFragment } = render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: false,
            hasDevPermissions: false,
            hasChildrenPermissions: false,
            hasUnrestrictedPermissions: false,
            hasAllocationsPermissions: false,
            hasAdultPermissions: true,
          }),
        }}
      >
        <RelationshipTable
          records={[
            legacyResidentFactory.build({
              ageContext: 'C',
              address: {
                address: 'some address',
                postcode: null,
              },
            }),
          ]}
          callback={null}
        />
      </UserContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
