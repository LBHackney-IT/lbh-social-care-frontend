import { render } from '@testing-library/react';

import Footer from './Footer';

jest.mock('./OGL', () => () => 'MockIcon');

describe('Footer', () => {
  it('should render properly', async () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
