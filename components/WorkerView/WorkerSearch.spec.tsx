import { render } from '@testing-library/react';
import WorkerSearch from './WorkerSearch';
import * as useWorkers from 'utils/api/workers';
import { mockedWorker } from 'factories/workers';
import { mockedAPIerror } from 'factories/APIerrors';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`WorkerSearch`, () => {
  it('should display search results', async () => {
    jest.spyOn(useWorkers, 'useWorker').mockImplementation(() => ({
      data: [mockedWorker],
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));
    const { asFragment } = render(<WorkerSearch />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should display the error', async () => {
    jest.spyOn(useWorkers, 'useWorker').mockImplementation(() => ({
      error: mockedAPIerror,
      revalidate: jest.fn(),
      mutate: jest.fn(),
      isValidating: false,
    }));
    const { asFragment } = render(<WorkerSearch />);
    expect(asFragment()).toMatchSnapshot();
  });
});
