import { render } from '@testing-library/react';

import Seo from './Seo';

jest.mock('next/head', () => {
  const mockedHead = ({ children }: { children: React.ReactChild }) => (
    <>{children}</>
  );
  return mockedHead;
});

describe('Seo component', () => {
  it('should work properly', () => {
    const { asFragment } = render(<Seo title="foo" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
