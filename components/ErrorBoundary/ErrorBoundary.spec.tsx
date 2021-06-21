import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const Child: React.FC<{ message?: string }> = ({ message }) => {
  throw new Error(message);
};

describe('Error Boundary', () => {
  it('should render the error boundary component when there is an error', () => {
    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    screen.getByText('A system error has occurred');
  });

  it('should render the error message when one is provided', () => {
    render(
      <ErrorBoundary>
        <Child message="Some custom error message" />
      </ErrorBoundary>
    );

    screen.getByText('Some custom error message');
  });
});
