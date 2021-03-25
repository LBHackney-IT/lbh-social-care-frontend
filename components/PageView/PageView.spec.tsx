import { render } from '@testing-library/react';

import PageView from './PageView';

describe(`PageView`, () => {
  const props = {
    officerEmail: 'test@test.com',
    title: 'Foo',
    formName: 'Bar',
    dateOfEvent: '05/06/2020',
    content: 'Foo Bar',
  };

  it('should render component', () => {
    const { asFragment } = render(<PageView {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
