import Router from 'next/router';
import { useEffect } from 'react';

const useWarnUnsavedChanges = (unsavedChanges: boolean): void => {
  const message = 'You may have unsaved changes. Do you want to continue?';

  useEffect(() => {
    const handleRouteChange = () => {
      if (unsavedChanges && !confirm(message)) {
        Router.events.emit('routeChangeError');
        throw `routeChange aborted. This error can be safely ignored - https://github.com/zeit/next.js/issues/2476.`;
      }
    };

    Router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [unsavedChanges]);
};

export default useWarnUnsavedChanges;
