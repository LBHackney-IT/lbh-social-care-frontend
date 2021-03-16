import { render } from '@testing-library/react';

import PageView from './PageView';

describe(`PageView`, () => {
  const props = {
    created: 'test@test.com',
    title: 'Foo',
    type: 'Bar',
    date: '05/06/2020',
    team: 'Foo 1223',
    note: 'Foo Bar',
  };

  it('should render component', () => {
    const { asFragment } = render(<PageView {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
