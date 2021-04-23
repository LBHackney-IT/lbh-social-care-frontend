import { render } from '@testing-library/react';

import ResidenTable from './ResidentsTable';
import { mockedLegacyResident } from 'factories/residents';

describe('ResidenTable component', () => {
  const props = {
    records: [mockedLegacyResident],
  };
  it('should render properly', () => {
    const { asFragment } = render(<ResidenTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
