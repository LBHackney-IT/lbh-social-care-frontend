import { render } from '@testing-library/react';

import Stack from './Stack';

describe(`Stack`, () => {
  it('should render properly', () => {
    const { asFragment } = render(
      <Stack space={7} className="foobar">
        <div>foo</div>
        <div>bar</div>
      </Stack>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
