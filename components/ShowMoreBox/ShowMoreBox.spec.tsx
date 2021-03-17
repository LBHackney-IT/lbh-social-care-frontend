import { render } from '@testing-library/react';

import ShowMoreBox from './ShowMoreBox';

let mockedElementHeight = 0;

jest.mock(
  'use-resize-observer',
  () => ({ onResize }: { onResize: (arg: { height: number }) => void }) => {
    onResize({ height: mockedElementHeight });
    return {};
  }
);

describe('ShowMoreBox component', () => {
  mockedElementHeight = 1000;
  it('should render properly - with show more', () => {
    const { asFragment } = render(
      <ShowMoreBox>
        <pre>{'foo'}</pre>
      </ShowMoreBox>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render properly - without', () => {
    mockedElementHeight = 10;
    const { asFragment } = render(
      <ShowMoreBox>
        <pre>{'foo'}</pre>
      </ShowMoreBox>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
