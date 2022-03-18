import { render } from '@testing-library/react';

import SelectWorker from './SelectWorker';

import { mockedWorker } from 'factories/workers';

describe('SelectWorker component', () => {
  it('should render a worker', () => {
    const { asFragment } = render(
      <SelectWorker
        records={[mockedWorker]}
        callback={(value: any) => console.log(value)}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
