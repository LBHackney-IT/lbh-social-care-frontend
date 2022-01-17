import WorkerSelect from './WorkerSelect';
import { render, screen, fireEvent } from '@testing-library/react';

describe('workerSelect', () => {
  const mockedWorker = {
    _meta: {
      location: {
        api: 'fakeapi',
        frontend: 'fakefrontend',
      },
      domain: 'worker',
    },
    id: 1,
    firstName: 'Fake',
    lastName: 'Worker',
    email: 'fakeworker@foo.com',
  };

  it('should render properly', () => {
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

  it('handles when no workers are found', () => {
    render(
      <WorkerSelect
        label="Matching workers"
        workers={[]}
        idToAdd={0}
        setIdToAdd={jest.fn()}
      />
    );

    expect(screen.getByText('No results'));
  });

  it('should call the setIdToAdd callback with the id of the selected worker', () => {
    const mockSetIdToAdd = jest.fn();

    const { container } = render(
      <WorkerSelect
        label="Matching workers"
        workers={[mockedWorker]}
        idToAdd={0}
        setIdToAdd={mockSetIdToAdd}
      />
    );

    const input = container.querySelector('input');
    input && fireEvent.click(input);

    expect(mockSetIdToAdd).toBeCalledWith(mockedWorker.id);
  });

  it("correctly formats a Worker's details", () => {
    render(
      <WorkerSelect
        label="Matching workers"
        workers={[mockedWorker]}
        idToAdd={mockedWorker.id}
        setIdToAdd={jest.fn()}
      />
    );
    expect(
      screen.getByText(`${mockedWorker.firstName} ${mockedWorker.lastName}`)
    );
    expect(screen.getAllByRole('radio').length).toBe(1);
  });
});
