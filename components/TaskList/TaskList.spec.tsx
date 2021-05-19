import TaskList from './TaskList';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router');

const form = {
  id: '1',
  name: 'Example form',
  steps: [
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
  ],
};

describe('TaskList', () => {
  it('renders correctly', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        id: 1,
      },
    });

    render(<TaskList completedSteps={[]} form={form} />);

    expect(screen.getAllByRole('heading', { level: 2 }).length).toBe(1);
    expect(screen.getByText('First theme'));

    expect(screen.getAllByRole('link').length).toBe(2);
    expect(screen.getByText('First example step'));
    expect(screen.getByText('Second example step'));
  });

  it('shows correct to do/done status', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        id: 1,
      },
    });

    render(<TaskList completedSteps={['1']} form={form} />);

    expect(screen.getAllByText('Done').length).toBe(1);
    expect(screen.getAllByText('To do').length).toBe(1);
  });
});
