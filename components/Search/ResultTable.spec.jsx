import { render } from '@testing-library/react';

import ResultTable from './ResultTable';

describe('ResultTable component', () => {
  const props = {
    results: [
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
    const { asFragment } = render(<ResultTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
