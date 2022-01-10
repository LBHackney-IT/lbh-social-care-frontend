const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  {
    distDir: 'build/_next',
    target: 'server',
    poweredByHeader: false,

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
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
    org: 'london-borough-of-hackney',
    project: 'social-care-main-app',
    // Ensure the value for ENVIRONMENT in your .env file is set to local or test
    dryRun: !['dev', 'stg', 'prod'].includes(process.env.ENVIRONMENT),
  }
);
