import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { AppConfigProvider, useAppConfig } from './appConfig';

describe('AppConfigContext', () => {
  describe('AppConfigProvider', () => {
    it('renders the provided children', () => {
      render(<AppConfigProvider appConfig={{}}>foobar</AppConfigProvider>);

      expect(screen.queryByText('foobar')).toBeVisible();
    });
  });

  describe('useAppConfig', () => {
    describe('getConfigValue', () => {
      it('returns the value from the appConfig that matches the identifier given', () => {
        const wrapper: React.FC = ({ children }) => (
          <AppConfigProvider appConfig={{ someIdentifier: 'someValue' }}>
            {children}
          </AppConfigProvider>
        );

        const { result } = renderHook(() => useAppConfig(), {
          wrapper,
        });

        expect(result.current.getConfigValue('someIdentifier')).toEqual(
          'someValue'
        );
      });

      it('throws an error if the hook is used outside of the provider', () => {
        const { result } = renderHook(() => useAppConfig(), {
          wrapper: undefined,
        });

        expect(() =>
          result.current.getConfigValue('someNonExistentIdentifier')
        ).toThrowError(
          'A <AppConfigProvider /> must be provided as a parent of this component'
        );
      });

      it('throws an error if the identifier given is not found in appConfig', () => {
        const wrapper: React.FC = ({ children }) => (
          <AppConfigProvider appConfig={{ someIdentifier: 'someValue' }}>
            {children}
          </AppConfigProvider>
        );

        const { result } = renderHook(() => useAppConfig(), {
          wrapper,
        });

        expect(() =>
          result.current.getConfigValue('someNonExistentIdentifier')
        ).toThrowError(
          'A value for someNonExistentIdentifier is not defined in the app config'
        );
      });
    });
  });
});
