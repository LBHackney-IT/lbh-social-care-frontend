import { render } from '@testing-library/react';

import CasesTable from './CasesTable';
import { mockedNote } from 'factories/cases';

describe('CasesTable component', () => {
  const props = {
    records: [mockedNote],
  };
  it('should render properly', () => {
    const { asFragment } = render(<CasesTable {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
