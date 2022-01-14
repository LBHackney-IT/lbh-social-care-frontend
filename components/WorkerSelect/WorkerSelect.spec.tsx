import WorkerSelect from './WorkerSelect';
import { render } from '@testing-library/react';

describe('workerSelect', () => {
  it('should render properly', () => {
    const mockedWorker = {
      data: {
        id: 1,
        firstName: 'Fake',
        lastName: 'Worker',
        email: 'fakeworker@foo.com',
      },
    };
    const { asFragment } = render(
      <WorkerSelect
        label="Matching workers"
        workers={[mockedWorker]}
        idToAdd={mockedWorker.id}
        setIdToAdd={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
