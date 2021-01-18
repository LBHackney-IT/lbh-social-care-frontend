import { useEffect } from 'react';
import { useRouter } from 'next/router';

import * as gtag from 'utils/gtag';

const handleRouteChange = (url) => {
  gtag.pageview(url);
};

const GoogleAnalytics = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return children;
};

export default GoogleAnalytics;
