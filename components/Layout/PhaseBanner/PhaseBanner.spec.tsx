import { render } from '@testing-library/react';

import PhaseBanner from './PhaseBanner';

describe('PhaseBanner', () => {
  it('should render properly', async () => {
    const { asFragment } = render(
      <PhaseBanner phase="alpha" faqLink="foo" handbookLink="bar" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
