import { render } from '@testing-library/react';

import ResidenTable from './ResidentsTable';

describe('ResidenTable component', () => {
  const props = {
    records: [
      {
        personId: 'foo',
        firstName: 'Fname',
        lastName: 'Lname',
        addressList: [
          { address: 'foo_address', postcode: 'foo_postcode' },
          { address: 'bar_address', postcode: 'bar_postcode' },
        ],
        dateOfBirth: '1978-02-23T00:00:00.0000000',
      },
    ],
  };
  it('should render properly', () => {
    const { asFragment } = render(<ResidenTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
