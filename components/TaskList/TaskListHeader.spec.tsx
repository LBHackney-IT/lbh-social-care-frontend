import TaskListHeader from './TaskListHeader';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mockedUser } from 'factories/users';
import { AuthProvider } from 'components/UserContext/UserContext';
import 'next/router';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { foo: 'bar' },
    replace: jest.fn(),
    pathname: 'foopath',
  }),
}));

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

    expect(screen.getByText('Ready to send'));
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

  it('renders correctly when a form is approvable', () => {
    render(
      <AuthProvider user={mockedUser}>
        <TaskListHeader
          onFinish={() => true}
          completedSteps={['1', '2']}
          steps={steps}
          approvable={true}
        />
      </AuthProvider>
    );

    expect(screen.getByText('You can now submit for approval.'));
    expect(screen.getByLabelText('Who should approve this?', { exact: false }));
  });

  it("accepts an approver's email", async () => {
    const mockFinish = jest.fn();

    render(
      <AuthProvider user={mockedUser}>
        <TaskListHeader
          onFinish={mockFinish}
          completedSteps={['1', '2']}
          steps={steps}
          approvable={true}
        />
      </AuthProvider>
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'foo.bar@hackney.gov.uk' },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(mockFinish).toBeCalled();
      expect(mockFinish).toBeCalledWith(
        {
          approverEmail: 'foo.bar@hackney.gov.uk',
        },
        expect.anything()
      );
    });
  });
});
