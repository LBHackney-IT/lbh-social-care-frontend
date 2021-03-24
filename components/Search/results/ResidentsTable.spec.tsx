import { render } from '@testing-library/react';

import ResidenTable from './ResidentsTable';
import { mockedResident } from 'factories/residents';

describe('ResidenTable component', () => {
  const props = {
    records: [mockedResident],
  };
  it('should render properly', () => {
    const { asFragment } = render(<ResidenTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
