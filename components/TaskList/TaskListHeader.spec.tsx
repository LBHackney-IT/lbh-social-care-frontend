import TaskListHeader from './TaskListHeader';
import { render, screen, fireEvent } from '@testing-library/react';

const steps = [
  {
    id: '1',
    name: 'First example step',
    fields: [],
    theme: 'First theme',
  },
  {
    id: '2',
    name: 'Second example step',
    fields: [],
    theme: 'First theme',
  },
];

describe('TaskList', () => {
  it('renders correctly when incomplete', () => {
    render(
      <TaskListHeader
        onFinish={() => true}
        completedSteps={['1']}
        steps={steps}
      />
    );

    expect(screen.getByText('Submission incomplete'));
    expect(
      screen.getByText("You've completed 1 of 2 sections.", { exact: false })
    );
  });

  it('renders correctly when complete', () => {
    render(
      <TaskListHeader
        onFinish={() => true}
        completedSteps={['1', '2']}
        steps={steps}
      />
    );

    expect(screen.getByText('Submission complete'));
  });

  const mockHandler = jest.fn();

  it('calls the finish handler', () => {
    render(
      <TaskListHeader
        onFinish={mockHandler}
        completedSteps={['1', '2']}
        steps={steps}
      />
    );

    fireEvent.click(screen.getByText('Finish and send'));
    expect(mockHandler).toHaveBeenCalled();
  });
});
