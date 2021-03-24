import { render } from '@testing-library/react';

import AllocatedCasesTable from './AllocatedCasesTable';
import { mockedAllocation } from 'factories/allocatedWorkers';

describe('AllocatedCasesTable component', () => {
  const props = {
    cases: [mockedAllocation],
  };

  it('should render records properly', () => {
    const { asFragment } = render(<AllocatedCasesTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
