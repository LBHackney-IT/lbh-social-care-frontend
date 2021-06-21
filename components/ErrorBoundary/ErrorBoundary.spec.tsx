import { render, screen } from '@testing-library/react';
import { Router } from 'next/router';
import { ErrorBoundary } from './ErrorBoundary';

jest.mock('next/router', () => ({
  withRouter: (Component: React.ComponentType<{ router: Router }>) =>
    function WithRouterComponent({ children }: { children: React.ReactNode }) {
      return (
        <Component
          router={
            {
              asPath: '/error-path',
            } as Router
          }
        >
          {children}
        </Component>
      );
    },
}));

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

  it('should render the page path when one is provided', () => {
    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    screen.getByText('/error-path');
  });
});
