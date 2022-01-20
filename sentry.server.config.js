// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NEXT_PUBLIC_SENTRY_TARGET,
  debug: process.env.NEXT_PUBLIC_SENTRY_TARGET === 'dev',
  beforeSend(event) {
    if (event.request?.cookies['hackneyToken']) {
      event.request.cookies['hackneyToken'] = '[Filtered]';
    }
    return event;
  },
});
