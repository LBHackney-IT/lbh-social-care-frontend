const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  {
    distDir: 'build/_next',
    poweredByHeader: false,

    async redirects() {
      return [
        {
          source: '/team-assignments',
          destination: '/',
          permanent: true,
        },
      ];
    },

    async headers() {
      const headers = [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
          ],
        },
      ];

      if (process.env.NODE_ENV === 'production') {
        headers[0].headers.push({
          key: 'Content-Security-Policy',
          value:
            "connect-src 'self' o183917.ingest.sentry.io; " +
            "default-src 'self' fonts.googleapis.com fonts.gstatic.com www.googletagmanager.com; " +
            "frame-ancestors 'self'; " +
            "form-action 'self';",
        });
      }

      return headers;
    },
  },
  {
    silent: true,
    org: 'london-borough-of-hackney',
    project: 'social-care-main-app',
    dryRun: !(
      process.env.CI ||
      ['dev', 'stg', 'prod'].includes(process.env.SENTRY_TARGET)
    ),
  }
);

// Ensure the value for ENVIRONMENT in your .env file is set to local or test
// dryRun: !['dev', 'stg', 'prod'].includes(process.env.SENTRY_TARGET)
